import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './Figure.module.css'
import client from '../client'

const builder = imageUrlBuilder(client)

function Figure(node) {
  const { alt, caption, imageExternalLink, asset } = node.value

  if (!asset) {
    return undefined
  }

  return (
    <figure className={styles.content}>
      <Link href={imageExternalLink && imageExternalLink} sx={{textDecoration: 'none'}}>
        <img
          src={builder.image(asset).auto('format').url()}
          className={styles.image}
          alt={alt}
        />
      </Link>
      {caption && (
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <p>{caption}</p>
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  )
}

Figure.propTypes = {
  node: PropTypes.shape({
    alt: PropTypes.string,
    caption: PropTypes.string,
    imageExternalLink: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
}
export default Figure
