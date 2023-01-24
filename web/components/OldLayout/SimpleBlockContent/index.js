import React from 'react'
import PropTypes from 'prop-types'
import {PortableText} from '@portabletext/react'
import EmbedHTML from '../EmbedHTML'
import Figure from '../Figure'
import Youtube from '../Youtube'

function SimpleBlockContent(props) {
  const {blocks} = props

  if (!blocks) {
    console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        types: {
          embedHTML: EmbedHTML,
          figure: Figure,
          youtube: Youtube,
        },
        marks: {
          link: ({children, value}) => {
            return value?.blank ? (
              <a href={value.href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <a href={value?.href}>{children}</a>
            )
          },
          color: ({children, value}) => {
            const hex = value.hex
            return value && <span style={{color: hex}}>{children}</span>
          },
        },
      }}
    />
  )
}

SimpleBlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
}

export default SimpleBlockContent
