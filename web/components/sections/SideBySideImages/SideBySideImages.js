import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  Container,
  Box,
  Typography,
  CssBaseline
} from '@mui/material'
import styles from './SideBySideImages.module.css'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function SideBySideImages(props) {
  const { images, heading, description, backgroundColor } = props

  console.log(props)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: backgroundColor && backgroundColor
      }}>
        <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }} >
          <Grid container py={6}>
            <CssBaseline />
            {
              heading && (
                <Grid item xs={12}>
                  <Typography className={styles.heading}>
                    {heading}
                  </Typography>
                </Grid>
              )
            }
            {
              description && (
                <Grid item xs={12}>
                  <Typography variant='p' paragraph sx={{ textAlign: 'center', fontSize: 16, fontFamily: 'Europa' }}>
                    {description}
                  </Typography>
                </Grid>
              )
            }
            <Grid item xs={12}>
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
                            marginLeft: { xs: '12%', md: '0' },
                            justifyContent: 'center',
                          }}
                        />
                      )
                    )
                  }
                  )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
  heading: PropTypes.string,
  description: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default SideBySideImages
