import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { Grid, Container, Box, CssBaseline } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Link from 'next/link'
import groq from 'groq'

const builder = imageUrlBuilder(client)

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
    <Box sx={{
      backgroundColor: backgroundColor && backgroundColor
    }}>
      <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'lg' } }} >
        <Grid container py={6}>
          <CssBaseline />
          {
            heading && (
              <Grid item xs={12} mb={12}>
                <div className={styles.simple__block__content}>
                  <SimpleBlockContent blocks={heading} />
                </div>
              </Grid>
            )
          }
          {
            images &&
            images.map((item) => (
              item.imagesContainers && (
                item.imagesContainers.map((item, i) => {
                  let title = null
                  if (item?.title[currentLanguage?.languageTag] && !item?.isTitleHidden) {
                    title = item.title[currentLanguage?.languageTag]
                  }
                  if (item?.images) {
                    return (
                      <Grid item xs={12} mb={4} key={i}>
                        {
                          title && <h5 className={styles.title__image}>{title}</h5>
                        }
                        <Grid container spacing={4} my={4}>
                          {
                            item.images.map((image, i) => {
                              if (image.imageExternalLink) {
                                return (
                                  <Grid item xs={6} md={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Link href={image.imageExternalLink} key={i}>
                                      <a target='_blank' rel="noopener">
                                        <Box
                                          component="img"
                                          alt={image.alt}
                                          src={builder.image(image).url()}
                                          key={image._key}
                                          sx={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                          }}
                                        />
                                      </a>
                                    </Link>
                                  </Grid>
                                )
                              } else {
                                return (
                                  <Grid item xs={6} md={3}>
                                    <Box
                                      component="img"
                                      alt={image.alt}
                                      src={builder.image(image).url()}
                                      key={image._key}
                                      sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                      }}
                                    />
                                  </Grid>
                                )
                              }
                            })
                          }
                        </Grid>
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
                <div className={`${styles.simple__block__content} ${styles.left}`}>
                  <SimpleBlockContent blocks={footerText} />
                </div>
              </Grid>
            )
          }
        </Grid>
      </Container>
    </Box>
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
