import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, Typography } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './HeadlineWithImages.module.css'
import Image from 'next/image'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    h2: {
      fontSize: 26,
      fontWeight: 'bold',
      lineHeight: '32px',
      color: '#0082E5',
      textAlign: 'center',
      marginBottom: '20px'
    }
  },
})

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeadlineWithImages(props) {
  const { heading, description, images } = props

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#091B3F', pt: 10, pb: 10 }}>
        <Container maxWidth="lg" >
          <Grid container>
            <Grid item xs={12}>
              {
                heading && (
                  <Typography variant="h2">{heading}</Typography>
                )
              }
            </Grid>
            <Grid item xs={12}>
              {
                description && (
                  <div className={styles.simpleBlockContent}>
                    <SimpleBlockContent blocks={description} />
                  </div>
                )
              }
            </Grid>
            <Grid item xs={12}>
              <div className={styles.imgGrid}>
                {
                  images && images.map((item) => {
                    return (
                      <Image
                        key={item._key}
                        src={urlFor(item.asset._ref).url()}
                        alt={item.alt}
                        width={250}
                        height={255}
                        objectFit={'contain'}
                      />
                    )
                  })
                }
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

HeadlineWithImages.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    _key: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  })),
}

export default HeadlineWithImages
