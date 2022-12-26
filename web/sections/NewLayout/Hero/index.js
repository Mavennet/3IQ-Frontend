import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function Hero(props) {
  const {
    heading,
    description,
    backgroundImage,
    backgroundColor,
    fontColor
  } = props

  console.log(props)

  return (
    <Box
      sx={{
        background:
          backgroundImage &&
          `url("${urlFor(backgroundImage)
            .url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: backgroundColor ? backgroundColor : '#091b3f',
        pt: { lg: 12, xs: 8 },
        pb: { lg: 18, xs: 14 },
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box sx={{ p: '5 1', pr: 1, pl: { xs: 1 } }}>
          <Box sx={{ pt: 5, pr: { md: 30, sm: 10 }, color: `${fontColor ? fontColor : '#fff'}`, align: 'left' }}>
            <h1 className={styles.heading}>{heading}</h1>
            <div className={styles.simpleBlockContent}>
              {description && <SimpleBlockContent blocks={description} />}
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  description: PropTypes.any,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Hero
