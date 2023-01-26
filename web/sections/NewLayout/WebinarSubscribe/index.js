import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {RiMailSendLine} from 'react-icons/ri'
import {BiTime, BiGlobe, BiPhone} from 'react-icons/bi'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import {LOCATIONS} from '../../../utils/groqQueries'
import ReactCountryFlag from 'react-country-flag'
import Button from '../../../components/NewLayout/Button'

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

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function WebinarSubscribe(props) {
  const {
    heading,
    dateLabel,
    hourLabel,
    localLabel,
    formLabel,
    date,
    hour,
    local,
    text,
    contactUsFormSrc,
    currentLanguage,
  } = props

  console.log(props)

  return (
    <Container maxWidth={'lg'}>
      <Grid container my={6}>
        <Grid item md={7} xs={12} sx={{md: {borderRight: '1px solid var(--gray)'}}}>
          <Box sx={{display: 'flex'}}>
            <Box mr={4}>
              <h4 className={styles.label}>{dateLabel}</h4>
              <span className={styles.item}>{date}</span>
            </Box>
            <Box mr={4}>
              <h4 className={styles.label}>{hourLabel}</h4>
              <span className={styles.item}>{hour}</span>
            </Box>
            <Box mr={4}>
              <h4 className={styles.label}>{localLabel}</h4>
              <span className={styles.item}>{local}</span>
            </Box>
          </Box>
          <Box className={styles.text} pr={{md: 8, xs: 4}}>
            <SimpleBlockContent blocks={text} />
          </Box>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box ml={{md: 6, xs: 2}}>
          <h3>{formLabel}</h3>
          </Box>
        
          <Box sx={{height: '800px'}} pl={{md: 6, sm: 2}} pr={{sm: 2}}>
            <iframe
              style={{width: '100%', height: '100%', border: 'none'}}
              name="my_iframe"
              src={contactUsFormSrc}
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

WebinarSubscribe.propTypes = {
  heading: PropTypes.object,
  contactUsFormSrc: PropTypes.object,
  dateLabel: PropTypes.object,
  hourLabel: PropTypes.object,
  localLabel: PropTypes.object,
  date: PropTypes.object,
  hour: PropTypes.object,
  local: PropTypes.object,
  text: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default WebinarSubscribe
