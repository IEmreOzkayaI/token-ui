"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, Loader2, AlertCircle, Image as ImageIcon } from "lucide-react"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { cn } from "@/lib/utils"

export interface MessageDefaultProps {
  variant?: "balloon" | "fullscreen"
}

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  image?: string
  timestamp: Date
}

interface ChatState {
  open: boolean
  messages: ChatMessage[]
  input: string
  loading: boolean
  error: string | null
}

export default function MessageDefault({ variant = "balloon" }: MessageDefaultProps) {
  const [state, setState] = useState<ChatState>({
    open: false,
    messages: [
      {
        id: "1",
        type: "assistant",
        content: "Merhaba! Size nasıl yardımcı olabilirim?",
        timestamp: new Date(Date.now() - 5000),
      },
    ],
    input: "",
    loading: false,
    error: null,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.messages])

  const handleSend = async () => {
    if (!state.input.trim() && !state.messages[state.messages.length - 1]?.image) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: state.input,
      image: state.messages[state.messages.length - 1]?.image,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
      loading: true,
      error: null,
    }))

    // Mock API call with random error (10%)
    setTimeout(() => {
      const hasError = Math.random() < 0.1

      if (hasError) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        }))
      } else {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "Bu harika bir soru! Size daha detaylı bilgi verebilirim.",
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          loading: false,
        }))
      }
    }, 800)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            type: "user",
            content: "Görsel yüklendi",
            image: imageData,
            timestamp: new Date(),
          },
        ],
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === "Escape") {
      setState((prev) => ({ ...prev, open: false }))
    }
  }

  const chatContent = (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h2 className="text-lg font-semibold">Sohbet</h2>
        {variant === "fullscreen" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setState((prev) => ({ ...prev, open: false }))}
            aria-label="Kapat"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.type === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-xs rounded-lg p-3 space-y-2",
                msg.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Yüklenen görsel"
                  className="max-w-xs rounded max-h-48 object-cover"
                />
              )}
              <p className="text-sm break-words">{msg.content}</p>
              <p className="text-xs opacity-70">
                {msg.timestamp.toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {state.loading && (
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Yazılıyor...</span>
            </div>
          </div>
        )}

        {state.error && (
          <div className="flex gap-3 animate-in fade-in">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="size-4 text-destructive" />
              <span className="text-sm text-destructive">{state.error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 space-y-2 bg-card">
        <div className="flex gap-2">
          <Input
            value={state.input}
            onChange={(e) => setState((prev) => ({ ...prev, input: e.target.value }))}
            onKeyDown={handleKeyDown}
            placeholder="Mesajınızı yazın..."
            disabled={state.loading}
            aria-label="Mesaj giriş alanı"
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={state.loading}
            aria-label="Görsel yükle"
          >
            <ImageIcon className="size-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={state.loading || (!state.input.trim())}
            aria-label="Gönder"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          aria-label="Görsel dosyası seç"
        />
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* FAB Button */}
      <Button
        size="icon"
        className={cn(
          "rounded-full shadow-lg animate-in fade-in zoom-in duration-300",
          "fixed bottom-6 right-6 z-40"
        )}
        onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
        aria-label="Sohbeti aç"
        aria-expanded={state.open}
      >
        <MessageSquare className="size-5" />
      </Button>

      {/* Chat Panel */}
      {state.open && (
        <>
          {/* Backdrop (fullscreen mode) */}
          {variant === "fullscreen" && (
            <div
              className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
              onClick={() => setState((prev) => ({ ...prev, open: false }))}
              aria-label="Kapat"
            />
          )}

          {/* Chat Container */}
          <div
            className={cn(
              "fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-300",
              variant === "fullscreen"
                ? "inset-0 flex items-center justify-center p-4"
                : "bottom-24 right-6 w-96 h-[500px] rounded-lg shadow-xl border"
            )}
          >
            <div
              className={cn(
                "bg-background rounded-lg shadow-xl border flex flex-col",
                variant === "fullscreen" ? "w-full h-full max-w-2xl" : "w-full h-full"
              )}
            >
              {chatContent}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
