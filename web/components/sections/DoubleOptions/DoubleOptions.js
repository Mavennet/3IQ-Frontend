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
import styles from './DoubleOptions.module.css'
import SimpleBlockContent from '../../SimpleBlockContent'

const builder = imageUrlBuilder(client)
const theme = createTheme()

function DoubleOptions(props) {
  const {heading, description, firstImage, secondImage, firstButton, secondButton, currentLanguage} = props
  const localeTitle = heading[currentLanguage.languageTag]
  const localeDescription = description[currentLanguage.languageTag]
  const localefirstButton = firstButton[currentLanguage.languageTag]
  const localesecondButton = secondButton[currentLanguage.languageTag]

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
          <Grid md={12} style={{color: '#091b3f'}}>
            {localeTitle && (
              <Typography mt={8} ml={2} mr={2} component="h2" variant="h4" className={styles.title}>
                {localeTitle}
              </Typography>
            )}
            {localeDescription && (
              <div className={styles.description}>
                <SimpleBlockContent blocks={localeDescription} />
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
            <Grid item md={6} xs={12} pt={5} pb={10} className={styles.firstBox}>
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mt={2}
                mb={5}
                alt="The house from the offer."
                src={builder.image(firstImage).url()}
              />
              {localefirstButton &&
                (
                <RedirectButton
                  {...localefirstButton}
                  reverse
                  sx={{width: {md: 150}, padding: '10px 20px'}}
                ></RedirectButton>
                )
              }
            </Grid>
            <Grid item md={6} xs={12} pt={5} pb={10} className={styles.seccondBox}>
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mt={2}
                mb={5}
                alt="The house from the offer."
                src={builder.image(secondImage).url()}
              />
              {localesecondButton &&
                (
                <RedirectButton
                  {...localesecondButton}
                  sx={{width: {md: 150}, padding: '10px 20px'}}
                ></RedirectButton>
                )
              }
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  )
}

DoubleOptions.propTypes = {
  firstImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  secondImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  firstButton: PropTypes.object,
  secondButton: PropTypes.object,
  heading: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object
}

export default DoubleOptions
