#!/usr/bin/env node
/**
 * Moves ui/components/{prefix}-{variant}.tsx → ui/components/{prefix}/{variant}.tsx
 * and updates imports across the repo.
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const COMPONENTS_DIR = path.join(ROOT, "ui/components")

const primitives = fs
  .readdirSync(path.join(ROOT, "ui/primitives"))
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""))

const extraPrefixes = ["typography", "date-picker"]
const prefixes = [...primitives, ...extraPrefixes].sort(
  (a, b) => b.length - a.length
)

const manual = {
  "file-upload-list": ["file-upload", "list"],
  "outline-item-group": ["item", "outline-group"],
  "radio-fields": ["field", "radio-fields"],
  "muted-item-group": ["item", "muted-group"],
}

function getMoveTarget(filename) {
  const base = filename.replace(/\.tsx$/, "")
  if (manual[base]) {
    const [folder, name] = manual[base]
    return { folder, name, oldPath: `ui/components/${filename}` }
  }

  for (const prefix of prefixes) {
    if (base === prefix) {
      return {
        folder: prefix,
        name: "index",
        oldPath: `ui/components/${filename}`,
      }
    }
    if (base.startsWith(`${prefix}-`)) {
      return {
        folder: prefix,
        name: base.slice(prefix.length + 1),
        oldPath: `ui/components/${filename}`,
      }
    }
  }

  return null
}

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.name === "node_modules" || entry.name === ".next") continue
    if (entry.isDirectory()) walkDir(full, files)
    else if (/\.(tsx?|mdx?)$/.test(entry.name)) files.push(full)
  }
  return files
}

// 1. Plan moves
const tsxFiles = fs
  .readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith(".tsx"))

const moves = []
for (const file of tsxFiles) {
  const target = getMoveTarget(file)
  if (!target) {
    console.error(`No target for ${file}`)
    process.exit(1)
  }
  moves.push({
    from: path.join(COMPONENTS_DIR, file),
    to: path.join(COMPONENTS_DIR, target.folder, `${target.name}.tsx`),
    oldImport: file.replace(/\.tsx$/, ""),
    newImport: `${target.folder}/${target.name}`,
    oldSourcePath: target.oldPath,
    newSourcePath: `ui/components/${target.folder}/${target.name}.tsx`,
  })
}

// 2. Execute moves
for (const move of moves) {
  fs.mkdirSync(path.dirname(move.to), { recursive: true })
  fs.renameSync(move.from, move.to)
}
console.log(`Moved ${moves.length} component files into folders.`)

// 3. Update imports in all source files
const sourceFiles = walkDir(ROOT).filter(
  (f) => !f.includes("node_modules") && !f.endsWith("reorganize-ui-components.mjs")
)

// Sort by old import length descending to avoid partial replacements
const sortedMoves = [...moves].sort(
  (a, b) => b.oldImport.length - a.oldImport.length
)

let updatedFiles = 0
for (const file of sourceFiles) {
  let content = fs.readFileSync(file, "utf8")
  const original = content

  for (const move of sortedMoves) {
    const importPatterns = [
      `@/ui/components/${move.oldImport}`,
      `@/components/${move.oldImport}`,
      `@/examples/${move.oldImport}`,
    ]
    const newImport = `@/ui/components/${move.newImport}`

    for (const old of importPatterns) {
      content = content.split(old).join(newImport)
    }

    content = content
      .split(`"${move.oldSourcePath}"`)
      .join(`"${move.newSourcePath}"`)
    content = content
      .split(`'${move.oldSourcePath}'`)
      .join(`'${move.newSourcePath}'`)
  }

  if (content !== original) {
    fs.writeFileSync(file, content)
    updatedFiles++
  }
}

console.log(`Updated imports in ${updatedFiles} files.`)
