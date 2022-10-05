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
import { Typography } from '@mui/material'
import YouTube from 'react-youtube'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function TextSection(props) {
  const { heading, text, videoSrc, button, currentLanguage, backgroundImage, isButtonCentralized, isGrayBackground } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  const opts = {
    width: '100%',
    height: '520',
    margin: '10px'
  };

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
        <Box sx={{ p: 5, pr: 1, pt: 0, pl: { xs: 1 }, }}>
          <Grid container>
            <Grid item sm={videoSrc ? 8 : 12} xs={12}>
              <Box sx={{ pt: 5, pr: videoSrc && { md: 20, sm: 0 }, align: 'left' }}>
                {heading && (
                  <Typography component="h2" variant="h4" sx={{color: '#0082e5', fontWeight: 'bold', mb: 6}}>
                    {heading}
                  </Typography>
                )}
                <div style={{background: isGrayBackground && '#e8e8ea', padding: 30}}>
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
              <Grid item md={4} sm={12} xs={12}>
                <Box
                  sx={{
                    position: { md: 'absolute', xs: 'relative' },
                    width: { xl: '20%', lg: '30%' },
                    top: { md: '300px' },
                    mt: { md: 5, xs: 5 },
                  }}
                  ml={{ md: 5 }}
                >
                  <YouTube videoId={videoSrc} opts={opts} />
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
  heading: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
  isButtonCentralized: PropTypes.bool,
  isGrayBackground: PropTypes.bool
}

export default TextSection
