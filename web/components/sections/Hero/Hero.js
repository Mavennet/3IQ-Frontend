import React from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import RedirectButton from '../../RedirectButton/RedirectButton'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h3: {
      fontSize: 50,
      fontWeight: 'bold'
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
})

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function Hero(props) {
  const {heading, description, backgroundImage, button, isSubscriptionSrcLink, isButtonReverse, currentLanguage } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  console.log(isSubscriptionSrcLink) // TODO Add logic to show button that opens popup on click with the Subscription SRC

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
          pt: {lg: 12, xs: 8},
          pb: {lg: 18, xs: 14},
        }}
      >
        <Container sx={{ maxWidth: {sm: 'md', lg: 'lg'} }}>
          <Box sx={{p: '5 1', pr: 1, pl:{xs: 1}}}>
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h3" style={{fontWeight: 'bold'}} gutterBottom>
                {heading}
              </Typography>
              <div className={styles.simpleBlockContent}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </Box>

            {localeButton && (localeButton.route || localeButton.link) && (
              <RedirectButton
              {...localeButton}
              reverse={!!isButtonReverse}
              sx={{mt: 8, width: {xs: '100%', md: 'auto'}, padding: '8px 25px', fontSize: '20px', fontWeight: '400'}}
              ></RedirectButton>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  description: PropTypes.any,
  button: PropTypes.object,
  isSubscriptionSrcLink: PropTypes.bool,
  isButtonReverse: PropTypes.bool,
  currentLanguage: PropTypes.object,
}

export default Hero
