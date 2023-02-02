import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import {Grid, Box, Container} from '@mui/material'
import YouTube from 'react-youtube'
import styles from './styles.module.scss'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function OverflowHero(props) {
  const {heading, title, backgroundImage, description, currentLanguage} = props

  return (
    <Box sx={{background: '#0D1C3D'}}>
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Grid
          container
          py={{md: 14, xs: 4}}
        //   spacing={{xs: 0, md: 4}}
          sx={{display: 'flex', alignItems: 'center'}}
        >
          <Grid item md={12} mt={{md: 2, xs: 0}}>
          {backgroundImage?.asset && (
              <Box
                component="img"
                sx={{
                  width: '125%',
                  position: 'relative',
                  left: -100,
                  display: {md: 'none', xs: 'block'}
                }}
                alt={backgroundImage.alt}
                src={builder.image(backgroundImage).url()}
              />
            )}
            {description && (
              <Box pr={{md: 60, xs: 2}} className={styles.simple__block__content}>
                <h3>{title}</h3>
                <SimpleBlockContent blocks={description}></SimpleBlockContent>
              </Box>
            )}
            {backgroundImage?.asset && (
              <Box
                component="img"
                mt={4}
                sx={{
                  height: '470px',
                  position: 'absolute',
                  top: 80,
                  right: {md: 30, xl: 500},
                  display: {md: 'block', xs: 'none'}
                }}
                alt={backgroundImage.alt}
                src={builder.image(backgroundImage).url()}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

OverflowHero.propTypes = {
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default OverflowHero
