import { Fragment } from 'react'
type Props = {
  text: string
}

const nlRegex = /\r\n|\r|\n/g

export default function Nl2Br({ text }: Props) {
  return (
    <>
      {
        text.split(nlRegex).map((str, key) => (
          <Fragment key={key}>
            {str}
            {
              key < text.length - 1 && (
                <br />
              )
            }
          </Fragment>
        ))
      }
    </>
  )
}
