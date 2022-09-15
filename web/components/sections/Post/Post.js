import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './Post.module.css'
import client from '../../../client'
import { Grid, Container, Typography, Link } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'
import Image from 'next/image'
import { format } from 'date-fns'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 16,
      color: '#091B3F'
    },
    h1: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#0082E5',
    },
  },
})

const builder = imageUrlBuilder(client)

function Post(props) {

  const { heading, body, publishedAt, mainImage, currentLanguage, currentCountry } = props

  const [publishedDate, setPublishedDate] = React.useState('')

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(publishedAt)
      const formattedDate = format(newYears, 'MMMM dd, yyyy', { locale: getLocale(currentLanguage.languageTag.replace("_", "-")) })
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, publishedAt])

  const shareHistoryText = currentCountry.shareThisStoryText[currentLanguage.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container my={2}>
          <Grid item xs={12} mb={4}>
            <div className={styles.imgGrid}>
              {
                mainImage && (
                  <Image
                    src={builder.image(mainImage).url()}
                    alt={heading}
                    layout='fill'
                    objectFit='cover'
                  />
                )
              }
            </div>
          </Grid>
          {
            heading && (
              <Grid item xs={12} my={6}>
                <Typography component="h1" variant="h1">
                  {heading}
                </Typography>
              </Grid>
            )
          }
          {
            body && (
              <Grid item xs={12}>
                <div className={styles.body}>
                  {body && <SimpleBlockContent blocks={body} />}
                </div>
              </Grid>
            )
          }
          {
            publishedDate && (
              <Grid item xs={12} my={2}>
                <div className={styles.publishedAt}>
                  <Typography component="h2" variant="h2" style={{ fontWeight: '300', fontSize: 16, textTransform: 'capitalize' }}>
                    {publishedDate}
                  </Typography>
                </div>
              </Grid>
            )
          }
          {
            shareHistoryText && (
              <Grid item xs={12} mb={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography component="h4" variant="h4" style={{ fontWeight: '900', fontSize: 24, textTransform: 'capitalize', color: '#0082E4' }}>
                  <strong>{shareHistoryText}</strong>
                </Typography>
                <ul className={styles.social}>
                  <Link href={`http://twitter.com/share?text=${heading}&url=${window.location.href}`} color="inherit" target='_blank' rel="noopener">
                    <li>
                      <FaTwitter />
                    </li>
                  </Link>
                  <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${heading}&summary=${heading}&source=LinkedIn`} color="inherit" target='_blank' rel="noopener">
                    <li>
                      <FaLinkedinIn />
                    </li>
                  </Link>
                </ul>
              </Grid>
            )
          }
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

Post.propTypes = {
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.object,
  body: PropTypes.object,
  publishedAt: PropTypes.object,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
}

export default Post
