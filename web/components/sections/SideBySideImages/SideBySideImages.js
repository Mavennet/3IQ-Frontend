import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, CssBaseline, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './SideBySideImages.module.css'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function SideBySideImages(props) {
  const { imagesContainers, heading, currentLanguage, backgroundColor, footerText } = props

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: backgroundColor && backgroundColor
      }}>
        <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'lg' } }} >
          <Grid container py={6}>
            <CssBaseline />
            {
              heading && (
                <Grid item xs={12} mb={4}>
                  <div className={styles.simpleBlockContent}>
                    <SimpleBlockContent blocks={heading} />
                  </div>
                </Grid>
              )
            }
            {
              imagesContainers &&
              imagesContainers.map((item) => {
                let title = null
                if (!item.isTitleHidden && item.title[currentLanguage?.languageTag]) {
                  title = item.title[currentLanguage?.languageTag]
                }
                if (item.images) {
                  return (
                    <Grid item xs={12} mb={4}>
                      {
                        title &&
                        <Typography
                          variant='h5'
                          sx={{
                            textTransform: 'uppercase',
                            color: '#0082e5',
                            fontSize: 20,
                            fontFamily: 'Europa',
                            fontWeight: 700
                          }}>
                          {title}:
                        </Typography>}
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
                      >
                        {
                          item.images.map((image) => {
                            return (
                              <Box
                                component="img"
                                alt={image.alt}
                                src={builder.image(image).url()}
                                key={image._key}
                                sx={{
                                  margin: '5px',
                                  padding: '30px',
                                  maxHeight: '110px',
                                  justifyContent: 'center',
                                }}
                              />
                            )
                          })
                        }
                      </Box>
                    </Grid>
                  )
                } else {
                  return null
                }
              })
            }
            {
              footerText && (
                <Grid item xs={12}>
                  <div style={{textAlign:'justify', padding: '20px'}}>
                    <SimpleBlockContent blocks={footerText} />
                  </div>
                </Grid>
              )
            }
          </Grid>
        </Container>
      </Box>
    </ThemeProvider >
  )
}

SideBySideImages.propTypes = {
  imagesContainers: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    _key: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  })),
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundColor: PropTypes.string,
  footerText: PropTypes.object,
}

export default SideBySideImages