import { Fragment, ReactNode } from 'react'
import { TNode } from '@/data/markdown'

// Renders the rich-text tree from src/data/markdown.ts with the same markup
// Storyblok's renderer produced: <div><p>…</p><ul><li><p>…</p></li></ul></div>.
function render(node: TNode, key?: number): ReactNode {
  const children = node.content?.map(render)
  switch (node.type) {
  case 'doc': return <div key={key}>{children}</div>
  case 'paragraph': return <p key={key}>{children}</p>
  case 'bullet_list': return <ul key={key}>{children}</ul>
  case 'list_item': return <li key={key}>{children}</li>
  case 'hard_break': return <br key={key} />
  case 'text': return (
    <Fragment key={key}>
      {/* Like Storyblok, each mark wraps the ones before it; a span goes outside. */}
      {[ ...(node.marks || []) ].sort((a, b) => +(a.type === 'span') - +(b.type === 'span')).reduce<ReactNode>(
        (inner, mark) => mark.type === 'span' ? <span>{inner}</span> : mark.type === 'bold' ? <strong>{inner}</strong> : <em>{inner}</em>,
        node.text,
      )}
    </Fragment>
  )
  }
}

export default function RichText({ doc }: { doc: TNode }) {
  return <>{render(doc)}</>
}
