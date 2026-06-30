"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type PreviewFrameProps = {
  width: number
  children: React.ReactNode
  className?: string
}

function syncDocumentTheme(targetDoc: Document) {
  targetDoc.documentElement.className = document.documentElement.className
  targetDoc.documentElement.style.colorScheme =
    document.documentElement.style.colorScheme
}

function syncStyles(targetDoc: Document) {
  const head = targetDoc.head
  head.querySelectorAll("[data-preview-style]").forEach((node) => node.remove())

  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (!(link instanceof HTMLLinkElement)) return
    const clone = targetDoc.createElement("link")
    clone.rel = "stylesheet"
    clone.href = link.href
    clone.setAttribute("data-preview-style", "")
    head.appendChild(clone)
  })

  document.querySelectorAll("style").forEach((style) => {
    const clone = targetDoc.createElement("style")
    clone.textContent = style.textContent
    clone.setAttribute("data-preview-style", "")
    head.appendChild(clone)
  })
}

export function PreviewFrame({ width, children, className }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountTarget, setMountTarget] = useState<HTMLElement | null>(null)
  const [frameHeight, setFrameHeight] = useState(640)

  const initializeIframe = useCallback(() => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument
    if (!doc) return

    if (!doc.body?.dataset.previewReady) {
      doc.open()
      doc.write(
        '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>'
      )
      doc.close()
      doc.body.dataset.previewReady = "true"
      doc.body.className =
        "bg-background text-foreground antialiased p-4 md:p-6"
    }

    syncStyles(doc)
    syncDocumentTheme(doc)
    setMountTarget(doc.body)
  }, [])

  useEffect(() => {
    const body = mountTarget
    if (!body) return

    const resizeObserver = new ResizeObserver(() => {
      setFrameHeight(Math.max(body.scrollHeight, 480))
    })
    resizeObserver.observe(body)

    return () => resizeObserver.disconnect()
  }, [mountTarget, width])

  useEffect(() => {
    return initializeIframe()
  }, [initializeIframe])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const doc = iframeRef.current?.contentDocument
      if (!doc) return
      syncStyles(doc)
      syncDocumentTheme(doc)
    })

    observer.observe(document.head, { childList: true, subtree: true })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={className}
      style={{ width: `${width}px`, maxWidth: "100%" }}
    >
      <iframe
        ref={iframeRef}
        title="Responsive preview frame"
        className="w-full border-0 bg-background"
        style={{ width: `${width}px`, height: frameHeight, minHeight: 480 }}
        onLoad={initializeIframe}
      />
      {mountTarget ? createPortal(children, mountTarget) : null}
    </div>
  )
}
