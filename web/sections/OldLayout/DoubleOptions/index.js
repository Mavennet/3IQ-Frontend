import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../../components/OldLayout/RedirectButton'
import styles from './DoubleOptions.module.css'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

const builder = imageUrlBuilder(client)
const theme = createTheme()

function DoubleOptions(props) {
  const {
    heading,
    description,
    firstImage,
    secondImage,
    firstButton,
    secondButton,
    currentLanguage
  } = props

  const localeFirstButton = firstButton[currentLanguage?.languageTag]
  const localeSecondButton = secondButton[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <div style={{background: '#f0f0f1'}}>
        <Grid
          container
          component="main"
          sx={{
            alignItems: 'center',
          }}
        >
          <CssBaseline />
          <Grid xs={12} md={12} style={{color: '#091b3f'}}>
            {heading && (
              <Typography
                mt={8}
                ml={2}
                mr={2}
                component="h2"
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {heading}
              </Typography>
            )}
            {description && (
              <div className={styles.description}>
                <SimpleBlockContent blocks={description} />
              </div>
            )}
          </Grid>
        </Grid>
        <Box sx={{pt: 5, pb: 10, pl: {md: 10, sm: 0}, pr: {md: 10, sm: 0}}}>
          <Grid
            container
            p={0.7}
            sx={{
              background: '#091b3f',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: {md: 0, xs: 5},
                pb: {md: 0, xs: 10},
              }}
            >
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mb={5}
                alt={firstImage.alt}
                src={builder.image(firstImage).url()}
              />
              {localeFirstButton && (localeFirstButton.route || localeFirstButton.link) && (
                <RedirectButton
                  {...localeFirstButton}
                  reverse
                  sx={{width: {md: 150}, padding: '10px 20px'}}
                ></RedirectButton>
              )}
            </Grid>
            <Grid item md={6} xs={12} pt={5} pb={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#f0f0f1',
              }}>
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mt={3}
                mb={5}
                alt={secondImage.alt}
                src={builder.image(secondImage).url()}
              />
              {localeSecondButton && (localeSecondButton.route || localeSecondButton.link) && (
                <RedirectButton
                  {...localeSecondButton}
                  sx={{width: {md: 150}, padding: '10px 20px'}}
                ></RedirectButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  )
}

DoubleOptions.propTypes = {
  firstImage: PropTypes.shape({
    alt: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  secondImage: PropTypes.shape({
    alt: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  firstButton: PropTypes.object,
  secondButton: PropTypes.object,
  heading: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default DoubleOptions
