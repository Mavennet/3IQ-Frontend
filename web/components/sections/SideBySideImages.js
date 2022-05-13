import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './SideBySideImages.module.css'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function SideBySideImages(props) {
  const {images, heading, currentLanguage} = props

  const localeHeading = heading[currentLanguage.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <Grid container   display="flex"
  justifyContent="center">
        <CssBaseline />
        <Grid item md={12} mt={5} mb={5}>
          <Typography className={styles.heading} gutterBottom>
            {localeHeading}
          </Typography>
        </Grid>
        <Grid item container md={11} mb={5}>
          {images &&
            images.map((image) => {
              return (
                <Grid item md={2.4} xs={12} display="flex"
                justifyContent="center" mb={5}>
                  {image.asset && (
                    <Box
                      component="img"
                      alt={image.alt}
                      src={builder.image(image).url()}
                      key={image._key}
                      sx={{
                        maxWidth: '180px',
                        maxHeight: '45px',
                      }}
                    />
                  )}
                </Grid>
              )
            })}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

SideBySideImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      _key: PropTypes.string,
      asset: PropTypes.shape({
        _ref: PropTypes.string,
      }),
    })
  ),
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default SideBySideImages
