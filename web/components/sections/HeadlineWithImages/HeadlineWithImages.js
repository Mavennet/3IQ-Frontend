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
// import styles from './HeadlineWithImages.module.css'

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

function HeadlineWithImages(props) {
  const {heading, description, images} = props

  console.log(heading, description, images)

  return ( // TODO
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

HeadlineWithImages.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    _key: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  })),
}

export default HeadlineWithImages
