import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import styles from './styles.module.scss'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroDoubleButton(props) {
  const {
    name,
    tagName,
    backgroundImage,
    description,
  } = props

  console.log(backgroundImage)

  return (
    <Box
      sx={{
        background: backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: 'var(--light-orange)',
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box py={15}>
          <div className={styles.text}>
            { name && (<h2>{name}</h2>) }
            { tagName && (<p>{tagName}</p>) }
            { description && (<p className={styles.p__small}>{description}</p>) }
          </div>
        </Box>
      </Container>
    </Box>
  )
}

HeroDoubleButton.propTypes = {
  backgroundImage: PropTypes.object,
  name: PropTypes.object,
  tagName: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroDoubleButton
