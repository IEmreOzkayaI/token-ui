#!/usr/bin/env node

import { execSync } from "child_process"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"

const ROOT = resolve(import.meta.dirname, "..")
const CHANGELOG_PATH = resolve(ROOT, "CHANGELOG.md")

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf-8" }).trim()
}

function getRemoteBranch() {
  try {
    return run("git rev-parse --abbrev-ref --symbolic-full-name @{u}").replace(/^origin\//, "")
  } catch {
    return null
  }
}

function getChangedFiles() {
  const remoteBranch = getRemoteBranch()
  const diffTarget = remoteBranch ? `origin/${remoteBranch}..HEAD` : "HEAD~1..HEAD"

  try {
    const raw = run(`git diff --name-status ${diffTarget}`)
    if (!raw) return []
    return raw.split("\n").map((line) => {
      const [status, ...parts] = line.split("\t")
      return { status: status.charAt(0), file: parts.join("\t") }
    })
  } catch {
    const raw = run("git diff --name-status HEAD~1..HEAD")
    if (!raw) return []
    return raw.split("\n").map((line) => {
      const [status, ...parts] = line.split("\t")
      return { status: status.charAt(0), file: parts.join("\t") }
    })
  }
}

const AREA_PATTERNS = [
  { pattern: /^ui\/components\/chart\//, area: "Chart", type: "component" },
  { pattern: /^ui\/components\/DataTable\//, area: "DataTable", type: "component" },
  { pattern: /^ui\/components\/card\//, area: "Card", type: "component" },
  { pattern: /^ui\/components\/([^/]+)\//, area: null, type: "component", extract: 1 },
  { pattern: /^ui\/primitives\//, area: "Primitives", type: "core" },
  { pattern: /^app\/docs\/ui\/components\/([^/]+)\//, area: null, type: "docs", extract: 1 },
  { pattern: /^app\/docs\//, area: "Documentation", type: "docs" },
  { pattern: /^app\/globals\.css$/, area: "Theme", type: "config" },
  { pattern: /^components\.json$/, area: "Config", type: "config" },
  { pattern: /^package\.json$/, area: "Dependencies", type: "config" },
  { pattern: /^pnpm-lock\.yaml$/, area: "Dependencies", type: "config" },
  { pattern: /^app\//, area: "App", type: "app" },
]

function classifyFile(file) {
  for (const rule of AREA_PATTERNS) {
    const match = file.match(rule.pattern)
    if (match) {
      const area = rule.area ?? capitalize(match[rule.extract])
      return { area, type: rule.type }
    }
  }
  return { area: "Other", type: "other" }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function statusLabel(s) {
  switch (s) {
    case "A": return "added"
    case "M": return "updated"
    case "D": return "removed"
    case "R": return "renamed"
    default: return "changed"
  }
}

function generateChangelog(files) {
  const grouped = {}

  for (const { status, file } of files) {
    if (file === "CHANGELOG.md") continue
    if (file === "pnpm-lock.yaml") continue

    const { area, type } = classifyFile(file)
    const key = `${type}::${area}`

    if (!grouped[key]) {
      grouped[key] = { area, type, files: [] }
    }
    grouped[key].files.push({ file, status, label: statusLabel(status) })
  }

  const typeOrder = ["component", "core", "docs", "config", "app", "other"]
  const typeHeaders = {
    component: "Components",
    core: "Core",
    docs: "Documentation",
    config: "Configuration",
    app: "Application",
    other: "Other",
  }

  const sections = []

  for (const type of typeOrder) {
    const entries = Object.values(grouped)
      .filter((g) => g.type === type)
      .sort((a, b) => a.area.localeCompare(b.area))

    if (entries.length === 0) continue

    const lines = [`### ${typeHeaders[type]}`]

    for (const entry of entries) {
      const added = entry.files.filter((f) => f.status === "A")
      const modified = entry.files.filter((f) => f.status === "M")
      const removed = entry.files.filter((f) => f.status === "D")

      if (added.length > 0 && modified.length === 0 && removed.length === 0) {
        const variants = added.map((f) => {
          const basename = f.file.split("/").pop().replace(/\.\w+$/, "")
          return `\`${basename}\``
        })
        lines.push(`- **${entry.area}**: Added ${variants.join(", ")} ${added.length > 1 ? "variants" : "variant"}`)
      } else if (modified.length > 0 && added.length === 0 && removed.length === 0) {
        const targets = modified.map((f) => {
          const basename = f.file.split("/").pop().replace(/\.\w+$/, "")
          return `\`${basename}\``
        })
        lines.push(`- **${entry.area}**: Updated ${targets.join(", ")}`)
      } else if (removed.length > 0 && added.length === 0 && modified.length === 0) {
        lines.push(`- **${entry.area}**: Removed ${removed.length} file${removed.length > 1 ? "s" : ""}`)
      } else {
        const parts = []
        if (added.length > 0) parts.push(`added ${added.length}`)
        if (modified.length > 0) parts.push(`updated ${modified.length}`)
        if (removed.length > 0) parts.push(`removed ${removed.length}`)
        lines.push(`- **${entry.area}**: ${capitalize(parts.join(", "))} file${(added.length + modified.length + removed.length) > 1 ? "s" : ""}`)
      }
    }

    sections.push(lines.join("\n"))
  }

  return sections.join("\n\n")
}

function getLastCommitSubject() {
  return run("git log -1 --format=%s")
}

function today() {
  return new Date().toISOString().split("T")[0]
}

// --- Main ---

const files = getChangedFiles()

if (files.length === 0) {
  console.log("No changes to push.")
  process.exit(0)
}

const subject = getLastCommitSubject()
const body = generateChangelog(files)
const date = today()

const entry = `## ${date}\n\n**${subject}**\n\n${body}`

let existing = ""
if (existsSync(CHANGELOG_PATH)) {
  existing = readFileSync(CHANGELOG_PATH, "utf-8")
}

const header = "# Changelog\n\nAll notable changes to Token UI.\n\n"

let content
if (existing.startsWith("# Changelog")) {
  const afterHeader = existing.replace(/^# Changelog\n+.*?\n\n/, "")
  content = `${header}${entry}\n\n---\n\n${afterHeader}`
} else if (existing) {
  content = `${header}${entry}\n\n---\n\n${existing}`
} else {
  content = `${header}${entry}\n`
}

writeFileSync(CHANGELOG_PATH, content)
console.log("✓ CHANGELOG.md updated")

// Stage and commit changelog
run("git add CHANGELOG.md")

try {
  run('git commit -m "docs: update changelog"')
  console.log("✓ Changelog committed")
} catch (e) {
  console.log("⚠ No changelog changes to commit")
}

// Push
const branch = run("git rev-parse --abbrev-ref HEAD")
try {
  console.log(`Pushing ${branch}...`)
  const output = run(`git push -u origin ${branch} 2>&1`)
  console.log(output || "✓ Pushed")
} catch (e) {
  console.error("Push failed:", e.message)
  process.exit(1)
}
