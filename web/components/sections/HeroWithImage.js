import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './HeroWithImage.module.css'
import client from '../../client'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'


const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroWithImage(props) {
  const {mainImage, heading, backgroundImage, tagline, ctas} = props

  const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto('format').url()}")`,
      }
    : {}

  console.log(props);

  return (
    <div className={styles.root} style={style}>
      <div className={styles.content}>
        <figure className={styles.mainImage}>
          <img
            src={builder.image(mainImage).auto('format').width(500).url()}
            className={styles.mainImage}
            alt={heading}
          />
        </figure>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>{tagline && <SimpleBlockContent blocks={tagline} />}</div>
        {ctas && (
          <div className={styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

HeroWithImage.propTypes = {
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  tagline: PropTypes.array,
  ctas: PropTypes.arrayOf(PropTypes.object),
}

export default HeroWithImage
