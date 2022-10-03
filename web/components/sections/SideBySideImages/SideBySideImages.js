/* eslint-disable no-debugger, no-console */
import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, CssBaseline, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './SideBySideImages.module.css'
import Link from 'next/link'
import groq from 'groq'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function SideBySideImages(props) {
  const { heading, currentLanguage, backgroundColor, footerText, _id } = props

  const [images, setImages] = React.useState(null)

  const fetchImages = async () => {
    await client.fetch(
      groq`
      *[_type == 'sideBySideImages' && _id == $sectionId] {
          _id,
          _type,
          _rev,
          imagesContainers[]-> {
          _id,
          _type,
          _rev,
          images,
          isTitleHidden,
          title,
          }
       }
     `,
      { sectionId: _id }
    )
      .then((response) => {
        setImages(response)
      })
  }

  React.useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              images &&
              images.map((item) => (
                item.imagesContainers && (
                  item.imagesContainers.map((item) => {
                    let title = null
                    if (item?.title[currentLanguage?.languageTag] && !item?.isTitleHidden) {
                      title = item.title[currentLanguage?.languageTag]
                    }
                    if (item?.images) {
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
                                if (image.imageExternalLink) {
                                  return (
                                    <Link href={image.imageExternalLink}>
                                      <a target='_blank' rel="noopener">
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
                                      </a>
                                    </Link>
                                  )
                                } else {
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
                                }
                              })
                            }
                          </Box>
                        </Grid>
                      )
                    }
                    return null
                  })
                )
              ))
            }
            {
              footerText && (
                <Grid item xs={12}>
                  <div style={{ textAlign: 'justify', padding: '20px' }}>
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
  _id: PropTypes.string,
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundColor: PropTypes.string,
  footerText: PropTypes.object,
}

export default SideBySideImages
