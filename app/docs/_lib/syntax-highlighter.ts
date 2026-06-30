export interface Token {
  type: string
  value: string
}

export function tokenizeJSON(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    const char = code[i]

    if (/\s/.test(char)) {
      let whitespace = ""
      while (i < code.length && /\s/.test(code[i])) {
        whitespace += code[i]
        i++
      }
      tokens.push({ type: "whitespace", value: whitespace })
    } else if (char === '"') {
      let str = '"'
      i++
      while (i < code.length && code[i] !== '"') {
        if (code[i] === "\\") {
          str += code[i] + code[i + 1]
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      if (i < code.length) str += '"'
      i++

      if (i < code.length && code[i] === ":") {
        tokens.push({ type: "key", value: str })
      } else {
        tokens.push({ type: "string", value: str })
      }
    } else if (/[0-9\-]/.test(char)) {
      let num = ""
      while (i < code.length && /[0-9\.\-e+]/.test(code[i])) {
        num += code[i]
        i++
      }
      tokens.push({ type: "number", value: num })
    } else if (code.slice(i, i + 4) === "true") {
      tokens.push({ type: "boolean", value: "true" })
      i += 4
    } else if (code.slice(i, i + 5) === "false") {
      tokens.push({ type: "boolean", value: "false" })
      i += 5
    } else if (code.slice(i, i + 4) === "null") {
      tokens.push({ type: "null", value: "null" })
      i += 4
    } else if ("{}[],:".includes(char)) {
      tokens.push({ type: "punctuation", value: char })
      i++
    } else {
      tokens.push({ type: "unknown", value: char })
      i++
    }
  }

  return tokens
}

export function getTokenColor(type: string, isDark: boolean): string {
  if (isDark) {
    switch (type) {
      case "key":
        return "text-blue-400"
      case "string":
        return "text-green-400"
      case "number":
        return "text-orange-400"
      case "boolean":
        return "text-pink-400"
      case "null":
        return "text-gray-400"
      case "punctuation":
        return "text-gray-300"
      default:
        return "text-gray-300"
    }
  } else {
    switch (type) {
      case "key":
        return "text-blue-600"
      case "string":
        return "text-green-600"
      case "number":
        return "text-orange-600"
      case "boolean":
        return "text-pink-600"
      case "null":
        return "text-gray-500"
      case "punctuation":
        return "text-gray-700"
      default:
        return "text-gray-700"
    }
  }
}
