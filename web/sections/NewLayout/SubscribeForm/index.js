import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {Typography} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function SubscribeForm(props) {
  const {contactUsFormSrc, items, currentLanguage, backgroundImage, title} = props

  return (
    <Grid container>
      <Grid
        item
        container
        md={6}
        xs={12}
        sx={{
          bgcolor: '#1495F8',
          background:
            backgroundImage &&
            `url("${urlFor(backgroundImage).url()}") no-repeat top center #1495F8`,
          backgroundSize: 'contain',
        }}
        order={{md: 1, xs: 2}}
      >
        <Box sx={{ml: 'auto', mr: 3, mt: {md: 10, xs: 6}}}>
          {items &&
            items.map((item, index) => (
              <Box key={`item_${index}`} ml={{md: 30, xs: 3}} p={4} mb={3} className={styles.card}>
                <Box sx={{display: 'flex'}}>
                  <img
                    style={{width: '20px', height: '20px'}}
                    src={builder.image(item.mainImage).url()}
                    className={styles.filteredImage}
                  />
                  <Box ml={1}>
                    <span>{item.heading[currentLanguage.languageTag]}</span>
                  </Box>
                </Box>

                <Box className={styles.text}>
                  <SimpleBlockContent blocks={item.text[currentLanguage.languageTag]} />
                </Box>
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item md={6} xs={12} order={{md: 2, xs: 1}}>
        <Box sx={{height: '960px'}} mt={3} pl={{md: 15, sm: 2}} pr={{md: 15, sm: 2}}>
          <br />
          <br />
          <Box className={styles.title}>{title && <SimpleBlockContent blocks={title} />}</Box>
          <br />
          <iframe
            style={{width: '100%', height: '100%', border: 'none'}}
            name="my_iframe"
            src={contactUsFormSrc}
          ></iframe>
        </Box>
      </Grid>
    </Grid>
  )
}

SubscribeForm.propTypes = {
  contactUsFormSrc: PropTypes.object,
  items: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default SubscribeForm
