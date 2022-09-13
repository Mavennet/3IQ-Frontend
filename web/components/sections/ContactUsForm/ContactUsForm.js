import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'
import {format, parseISO} from 'date-fns'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './ContactUsForm.module.css'
import isWithinInterval from 'date-fns/isWithinInterval/index.js'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function ContactUsForm(props) {
  const {contactUsFormSrc, mainImage, description, currentLanguage} = props

  console.log(contactUsFormSrc, mainImage, description, currentLanguage)

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <CssBaseline />
        <Grid
          item
          container
          md={6}
          xs={12}
          order={{md: 1, xs: 2}}
          sx={{
            bgcolor: '#091b3f',
          }}
        >
          <Grid
            item
            md={12}
            sx={{
              height: '500px',
              width: '100%',
              background: mainImage && `url("${urlFor(mainImage).url()}") no-repeat center center`,
              backgroundSize: 'cover',
              bgcolor: '#091b3f',
            }}
          >
          </Grid>
          <Grid
            item
            container
            md={12}
            sx={{
              height: '500px',
              color: 'white',
            }}
          >
            <Grid md={6} sx={{height: '100%'}}></Grid>
            <Grid md={6} sx={{height: '100%'}}>
              <Box className={styles.description} mt={10}>{description && <SimpleBlockContent blocks={description} />}</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} order={{md: 2, xs: 1}} sx={{height: '1000px'}}>
          <Box sx={{height: '100%'}} pl={10} pr={10}>
          <iframe style={{width: '100%', height: '100%', border: 'none'}} name="my_iframe" src={contactUsFormSrc}></iframe>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

ContactUsForm.propTypes = {
  contactUsFormSrc: PropTypes.object,
  mainImage: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default ContactUsForm
