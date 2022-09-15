import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './HeroWithImage.module.css'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../SimpleBlockContent'
import RedirectButton from '../RedirectButton/RedirectButton'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

function HeroWithImage(props) {
  const {mainImage, heading, backgroundImage, description, button, currentLanguage } = props

  const localeButton = button[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage &&
            `url("${urlFor(backgroundImage)
              .url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          pt: 2,
          pb: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{p: 5, pl: 1, pr: 1}}>
            <Box
              component="img"
              sx={{
                maxWidth: {md: 400, xs: 300},
              }}
              alt={mainImage.alt}
              src={builder.image(mainImage).url()}
            />
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h5" style={{fontWeight: 'bold'}} gutterBottom>
                {heading}
              </Typography>
              <div className={styles.description}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </Box>

            {localeButton && (localeButton.route || localeButton.link) &&
               (
               <RedirectButton
               {...localeButton}
               reverse
               sx={{mt: 4, width: {xs: '100%', md: 'auto'}, padding: '15px 60px'}}
               ></RedirectButton>
              )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

HeroWithImage.propTypes = {
  mainImage: PropTypes.shape({
    alt: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroWithImage
