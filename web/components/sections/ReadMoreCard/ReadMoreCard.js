import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './ReadMoreCard.module.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
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

function ReadMoreCard(props) {
  const {button, heading, backgroundImage, description, currentLanguage } = props

  const localeButton = button[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={12}
          py={{xs: 40}}
          sm={4}
          md={6}
          sx={{
            background:
              backgroundImage.asset._ref && `url("${urlFor(backgroundImage.asset._ref).url()}") no-repeat center center`,
            backgroundSize: 'cover',
            bgcolor: '#091b3f',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        </Grid>
        <Grid item xs={12} sm={8} md={6} elevation={6} square>
          <Box
            sx={{
              mt: 10,
              mb: 2,
              ml: {xs: 2, md: 10},
              mr: {xs: 0, md: 8},
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#091b3f',
            }}
          >
            {heading && (
              <Typography component="h1" variant="h4" style={{fontWeight: 'bold', color: '#0082E5'}} gutterBottom>
                {heading}
              </Typography>
            )}
            {description && (
              <div className={styles.description}>
                <SimpleBlockContent blocks={description} />
              </div>
            )}
            <Box
              sx={{
                mt: 5,
                mb: 5,
                display: 'flex',
                justifyContent: {xs: 'center', md: 'flex-end'}
              }}
            >
            {localeButton && (localeButton.route || localeButton.link) && (
              <RedirectButton
                {...localeButton}
                sx={{width: {xs: 'auto', md: 180}, padding: '10px 20px', margin: {xs: '0 14px 0 0', md: '0'}, fontSize: '16px', background: '#091B3F', borderColor: '#091B3F', color: '#fff'}}
              />
            )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

ReadMoreCard.propTypes = {
  button: PropTypes.object,
  description: PropTypes.string,
  backgroundImage: PropTypes.object,
  heading: PropTypes.string,
  currentLanguage: PropTypes.object,
}

export default ReadMoreCard
