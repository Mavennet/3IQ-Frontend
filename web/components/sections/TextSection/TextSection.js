import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TextSection.module.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function TextSection(props) {
  const { text, videoSrc, button, currentLanguage, backgroundImage, isButtonCentralized } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  return (
    <Box sx={{
      background:
        backgroundImage &&
        `url("${urlFor(backgroundImage)
          .url()}") no-repeat center center`,
      backgroundSize: 'cover',
      bgcolor: backgroundImage ? '#091b3f' : '#fff',
    }}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box sx={{ p: 5, pr: 1, pt: 0, pl: { xs: 1 } }}>
          <Grid container>
            <Grid item sm={videoSrc ? 8 : 12} xs={12}>
              <Box sx={{ pt: 5, pr: videoSrc && { md: 20, sm: 0 }, align: 'left' }}>
                <div>
                  {text && (
                    <Grid className={styles.textSection} container spacing={2}>
                      <SimpleBlockContent blocks={text} />
                    </Grid>
                  )}
                </div>
                {localeButton && (localeButton.route || localeButton.link) && (
                  <Box sx={{ display: 'flex', justifyContent: isButtonCentralized ? 'center' : 'flex-start' }}>
                    <RedirectButton {...localeButton} sx={{ width: { xs: '100%', md: 250 }, mt: 5 }} />
                  </Box>
                )}
              </Box>
            </Grid>
            {videoSrc && (
              <Grid item md={4} sm={12}>
                <Box
                  sx={{
                    position: { md: 'absolute', xs: 'relative' },
                    width: { xl: '20%', lg: '30%' },
                    top: { md: '300px' },
                    mt: { md: 5, xs: 5 },
                  }}
                  ml={{ md: 5 }}
                >
                  <video
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    controls="controls"
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

TextSection.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
  isButtonCentralized: PropTypes.bool
}

export default TextSection
