import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeroFirstVariation.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'

const theme = createTheme()

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroFirstVariation(props) {
  const {heading, backgroundImage, firstButton, secondButton, currentLanguage } = props

  const localeFirstButton = firstButton[currentLanguage?.languageTag]
  const localeSecondButton = secondButton[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat`,
          backgroundPosition: '555px 0px',
          backgroundSize: 'contain',
          bgcolor: '#d2d1d4',
          pt: 5,
          pb: 15,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{p: '5 1', pr: 1, pl: {xs: 1}}}>
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <div className={styles.heading}>
                {heading && <SimpleBlockContent blocks={heading} />}
              </div>
            </Box>
            <Grid container pt={5}>
              <Grid item md={5} xs={12}>
                {localeFirstButton && (localeFirstButton.route || localeFirstButton.link) && (
                  <RedirectButton {...localeFirstButton} sx={{padding: '10px 20px'}}></RedirectButton>
                )}
              </Grid>
              <Grid item md={7} xs={12} pt={{xs: 2, md: 0}}>
                {localeSecondButton && (localeSecondButton.route || localeSecondButton.link) && (
                  <RedirectButton
                    {...localeSecondButton}
                    reverse
                    className={styles.secondButton}
                    sx={{padding: '10px 20px'}}
                  ></RedirectButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

HeroFirstVariation.propTypes = {
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  firstButton: PropTypes.object,
  secondButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroFirstVariation
