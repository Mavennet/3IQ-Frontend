import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import RedirectButton from '../../RedirectButton/RedirectButton'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

function HeroDoubleButton(props) {
  const {mainImage, backgroundImage, description, button, secondButton, currentLanguage} = props

  const localeButton = button[currentLanguage?.languageTag]
  const localeSecondButton = secondButton[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          pt: 2,
          pb: 2,
          height: '800px',
        }}
      >
        <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Box sx={{p: 5, pl: 1, pr: 1}}>
              { mainImage && 
              (<Box
                component="img"
                sx={{
                  maxWidth: {md: 800, sm: 500, xs: 350},
                  pt: 10,
                }}
                alt={mainImage.alt}
                src={builder.image(mainImage).url()}
              />
              )}
              <Box sx={{pt: 2, color: '#fff'}}>
                <Typography
                  component="h1"
                  variant="h4"
                  style={{fontWeight: 'bold', color: '#0082e5'}}
                  gutterBottom
                >
                  {description}
                </Typography>
              </Box>
            </Box>

            <Box sx={{display: {sm: 'inline-flex', xs: 'inline-block'}, mx: 'auto', mt: 10}}>
              {localeButton && (localeButton.route || localeButton.link) && (
                <RedirectButton
                  {...localeButton}
                  reverse
                  sx={{
                    padding: '18px 60px',
                    mr: {sm: 5},
                    borderRadius: 0,
                    fontWeight: 'normal',
                    fontSize: '18px',
                    color: '#dc6e19',
                    '&:hover': {background: '#dc6e19', color: 'white'},
                  }}
                ></RedirectButton>
              )}
              {localeSecondButton && (localeSecondButton.route || localeSecondButton.link) && (
                <RedirectButton
                  {...localeSecondButton}
                  sx={{
                    padding: '18px 60px',
                    borderRadius: 0,
                    fontSize: '18px',
                    fontWeight: 'normal',
                  }}
                ></RedirectButton>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

HeroDoubleButton.propTypes = {
  mainImage: PropTypes.shape({
    alt: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  secondButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroDoubleButton
