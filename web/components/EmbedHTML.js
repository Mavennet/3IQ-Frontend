import React from 'react'
import PropTypes from 'prop-types'
import styles from './EmbedHTML.module.css'

function EmbedHTML(node) {
  const { html } = node.value

  if (!html) {
    return null
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className={styles.embed}/>
  )
}

EmbedHTML.propTypes = {
  node: PropTypes.shape({
    html: PropTypes.string,
  }),
}
export default EmbedHTML
