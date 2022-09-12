import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
// import imageUrlBuilder from '@sanity/image-url'
// import client from '../../../client'
// import CssBaseline from '@mui/material/CssBaseline'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
// import Grid from '@mui/material/Grid'
// import RedirectButton from '../../RedirectButton/RedirectButton'
// import {format, parseISO} from 'date-fns'
// import SimpleBlockContent from '../../SimpleBlockContent'
// import styles from './ContactUsForm.module.css'

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

// function urlFor(source) {
//   return imageUrlBuilder(client).image(source)
// }

function ContactUsForm(props) {  
  const {contactUsFormSrc, mainImage, description, currentLanguage} = props

  console.log(contactUsFormSrc, mainImage, description, currentLanguage)
  
  return ( // TODO
    <ThemeProvider theme={theme}>
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
