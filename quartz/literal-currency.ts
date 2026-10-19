/** Preserve caption dollar signs as text instead of interpreting them as math. */
export function literalCurrency(source: string): string {
  let frontmatter = source.startsWith('---\n')
  let firstLine = true
  let fence = ''
  return source.split('\n').map((line) => {
    if (firstLine) {
      firstLine = false
      if (frontmatter) return line
    }
    if (frontmatter) {
      if (line.trim() === '---') frontmatter = false
      return line
    }
    const marker = line.match(/^\s*(`{3,}|~{3,})/)
    if (marker) {
      if (!fence) fence = marker[1][0]
      else if (marker[1][0] === fence) fence = ''
      return line
    }
    return fence ? line : line.replace(/(?<!\\)\$/g, '\\$')
  }).join('\n')
}
