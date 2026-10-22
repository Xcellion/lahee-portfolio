/**
 * The small Markdown subset used for work descriptions, parsed into the same
 * rich-text tree Storyblok produced (doc / paragraph / bullet_list / list_item /
 * text / hard_break with bold and italic marks).
 *
 *   Blank line        new paragraph
 *   Line ending in \  line break (a line holding only \ is an empty line)
 *   - item            bullet list item (indent following lines, or a following
 *                     blank-line-separated block, by two spaces to continue it)
 *   **bold**  *italic*
 *   <span>text</span>  larger text (the labels in a section's opening stats list)
 *   <p></p>           an empty paragraph (extra spacing)
 */

export type TMark = { type: 'bold' | 'italic' | 'span' }
export type TNode = {
  type: 'doc' | 'paragraph' | 'bullet_list' | 'list_item' | 'text' | 'hard_break'
  text?: string
  marks?: TMark[]
  content?: TNode[]
}

function parseInline(source: string): TNode[] {
  const nodes: TNode[] = []
  const active: TMark['type'][] = []
  let text = ''
  const flush = () => {
    if (!text) return
    const node: TNode = { type: 'text', text }
    if (active.length) node.marks = active.map((type) => ({ type }))
    nodes.push(node)
    text = ''
  }
  const toggle = (type: TMark['type']) => {
    flush()
    const i = active.indexOf(type)
    if (i === -1) active.push(type)
    else active.splice(i, 1)
  }
  for (let i = 0; i < source.length; i++) {
    const c = source[i]
    if (c === '\\' && i + 1 < source.length) {
      text += source[++i]
    } else if (source.startsWith('<span>', i) || source.startsWith('</span>', i)) {
      toggle('span')
      i = source.indexOf('>', i)
    } else if (source.startsWith('**', i)) {
      toggle('bold')
      i++
    } else if (c === '*') {
      toggle('italic')
    } else {
      text += c
    }
  }
  flush()
  return nodes
}

// Lines of one paragraph; a trailing backslash is a hard break.
function parseLines(lines: string[]): TNode[] {
  const content: TNode[] = []
  lines.forEach((line, i) => {
    const hardBreak = line.endsWith('\\') && !line.endsWith('\\\\')
    content.push(...parseInline(hardBreak ? line.slice(0, -1) : line))
    if (hardBreak) content.push({ type: 'hard_break' })
    else if (i < lines.length - 1) content.push({ type: 'text', text: ' ' })
  })
  return content
}

function paragraph(lines: string[]): TNode {
  // "<p></p>" keeps an intentionally empty paragraph (extra spacing).
  if (lines.join('').trim() === '<p></p>') return { type: 'paragraph' }
  const content = parseLines(lines)
  return content.length ? { type: 'paragraph', content } : { type: 'paragraph' }
}

export function parseMarkdown(source: string): TNode | null {
  const blocks = source.trim().split(/\n\s*\n/).filter(Boolean)
  if (!blocks.length) return null
  const content: TNode[] = []
  for (const block of blocks) {
    const lines = block.split('\n')
    const prev = content[content.length - 1]
    if (lines[0].startsWith('- ')) {
      // Each "- " starts an item; indented lines continue it.
      const items: string[][] = []
      for (const line of lines) {
        if (line.startsWith('- ')) items.push([ line.slice(2) ])
        else items[items.length - 1].push(line.replace(/^ {2}/, ''))
      }
      const listItems: TNode[] = items.map((item) => ({ type: 'list_item', content: [ paragraph(item) ] }))
      // Items separated by blank lines still belong to one list.
      if (prev?.type === 'bullet_list') prev.content!.push(...listItems)
      else content.push({ type: 'bullet_list', content: listItems })
    } else if (lines[0].startsWith('  ') && prev?.type === 'bullet_list') {
      // An indented block after an item is another paragraph of that item.
      const item = prev.content![prev.content!.length - 1]
      item.content!.push(paragraph(lines.map((line) => line.replace(/^ {2}/, ''))))
    } else {
      content.push(paragraph(lines))
    }
  }
  return { type: 'doc', content }
}
