import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './SideBySideImages.module.css'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function SideBySideImages(props) {
  const { images, heading, currentLanguage } = props

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className={styles.container}>
        <CssBaseline />
        <Grid
          xs={10}
          sm={10}
          md={10}
          lg={8}
          xl={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: {xs: '8%', md:'8%', lg:'16%', xl:'24%'}
          }}>
          <Box
          >
            <Typography className={styles.heading} gutterBottom>
              {heading}
            </Typography>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }} 
            >
              {images &&
                images.map(image => {
                  return (
                    image.asset && (
                      <Box
                        component="img"
                        alt={image.alt}
                        src={builder.image(image).url()}
                        key={image._key}
                        sx={{
                          margin: '5px',
                          padding: '30px',
                          maxHeight: '110px',
                          marginLeft: {xs: '12%', md:'0' },
                          justifyContent: 'center',
                        }}
                      />
                    )
                  )
                }
                )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

SideBySideImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    _key: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  })),
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default SideBySideImages
