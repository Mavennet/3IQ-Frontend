import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {Typography} from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'

const builder = imageUrlBuilder(client)

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

function SubscribeForm(props) {
  const {contactUsFormSrc, items, currentLanguage} = props

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
            bgcolor: '#e8e8ea',
            height: '960px',
            width: '100%',
            p: {xs: 8, md: 18}
          }}
        >
          {items &&
            items.map((item, index) => (
              <Box key={`item_${index}`}>
                <Box sx={{display: 'flex'}}>
                <img style={{width: '35px', height: '35px'}} src={builder.image(item.mainImage).url()}/>
                <Typography sx={{ml: 1, fontWeight: 'bold', color: '#dc6e19'}} component="h3" variant="h4">
                  {item.heading[currentLanguage.languageTag]}
                </Typography>
                </Box>
              
                <Box sx={{fontSize: '18px'}}>
                  <SimpleBlockContent blocks={item.text[currentLanguage.languageTag]} />
                </Box>
              </Box>
            ))}
            
        </Grid>
        <Grid item md={6} xs={12} order={{md: 2, xs: 1}} sx={{height: '960px'}}>
          <Box sx={{height: '960px'}} mt={3} pl={{md: 15, sm: 2}} pr={{md: 15, sm: 2}}>
            <iframe
              style={{width: '100%', height: '100%', border: 'none'}}
              name="my_iframe"
              src={contactUsFormSrc}
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

SubscribeForm.propTypes = {
  contactUsFormSrc: PropTypes.object,
  items: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default SubscribeForm
