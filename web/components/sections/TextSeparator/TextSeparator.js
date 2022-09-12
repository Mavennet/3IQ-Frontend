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
// import styles from './TextSeparator.module.css'

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

function TextSeparator(props) {
  const {portableText} = props

  console.log(portableText)

  return ( // TODO
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

TextSeparator.propTypes = {
  portableText: PropTypes.object,
}

export default TextSeparator
