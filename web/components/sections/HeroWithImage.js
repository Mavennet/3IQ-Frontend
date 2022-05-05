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
import BigButton from '../BigButton'
import SimpleBlockContent from '../SimpleBlockContent'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

function HeroWithImage(props) {
  const {mainImage, heading, backgroundImage, description, button} = props

  const currentCountry = 'Canada' // Obtained from the URL 
  const availableLanguagesForCurrentCountry = ['en_US', 'en_CA', 'fr'] // Obtained from the currentCountry
  const currentLanguage = 'en_CA' // Obtained from the URL (?) // TODO: Get dinamically

  const localeHeading = heading[currentLanguage]
  const localeDescription = description[currentLanguage]
  const localeButton = button[currentLanguage]

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
        <Container maxWidth="md">
          <Box sx={{p: 5}}>
            <Box
              component="img"
              sx={{
                maxWidth: {md: 400, xs: 300},
              }}
              alt="The house from the offer."
              src={builder.image(mainImage).url()}
            />
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h5" style={{fontWeight: 'bold'}} gutterBottom>
                {localeHeading}
              </Typography>
              <div className={styles.description}>
                {localeDescription && <SimpleBlockContent blocks={localeDescription} />}
              </div>
            </Box>

            {localeButton &&
               (
                <BigButton
                  sx={{mt: 4, width: {xs: '100%', md: 'auto'}, padding: '15px 60px'}}
                  title={localeButton.title}
                >
                </BigButton>
              )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

HeroWithImage.propTypes = {
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
}

export default HeroWithImage
