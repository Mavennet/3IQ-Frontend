import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './NewsCard.module.css'
import client from '../../../client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client)

const theme = createTheme()

function NewsCard(props) {  
  const {post,  buttonText, currentLanguage} = props

  const localeButtonText = buttonText[currentLanguage.languageTag]

  console.log(post)
  console.log(localeButtonText)
  console.log(builder)

  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

NewsCard.propTypes = {
  post: PropTypes.object,
  buttonText: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default NewsCard
