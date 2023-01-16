import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { Grid, Box, Container } from '@mui/material'
import YouTube from 'react-youtube'
import styles from './styles.module.scss'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function ImageBesideText(props) {
  const {
    videoSrc,
    heading,
    backgroundImage,
    description,
    currentLanguage,
    isInvertedLayout
  } = props

  const opts = {
    width: '100%',
    height: '320',
    margin: '10px',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      playlist: videoSrc
    }
  };

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
      <Grid container py={10} spacing={{ xs: 0, md: 4 }} sx={{ flexDirection: { xs: 'column-reverse', md: !isInvertedLayout ? 'unset' : 'row-reverse' } }}>
        <Grid item xs={12} md={6} lg={7}>
          {backgroundImage?.asset && (
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                height: 'auto'
              }}
              alt={backgroundImage.alt}
              src={builder.image(backgroundImage).url()}
            />
          )}
          {videoSrc && (
            <div>
              <YouTube videoId={videoSrc} opts={opts} />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={5} mt={2}>
          {
            description && (
              <div className={styles.simple__block__content}>
                <SimpleBlockContent blocks={description}></SimpleBlockContent>
              </div>
            )
          }
        </Grid>
      </Grid>
    </Container>
  )
}

ImageBesideText.propTypes = {
  isInvertedLayout: PropTypes.bool,
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
  videoSrc: PropTypes.string,
}

export default ImageBesideText
