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
import {format, parseISO} from 'date-fns'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function NewsCard(props) {  
  const {post, buttonText, route, currentLanguage} = props

  const localeHeading = post.heading[currentLanguage.languageTag]
  
  console.log(post.author)
  console.log(post.publishedAt)

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            background:
              post.mainImage && `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
            backgroundSize: 'cover',
            bgcolor: '#091b3f',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        </Grid>
        <Grid item xs={10} sm={6} md={5} elevation={6} square>
          <Box
            sx={{
              mt: 10,
              mb: 2,
              ml: {xs: 2, md: 10},
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#091b3f',
            }}
          >
            {localeHeading && (
              <Typography component="h1" variant="h4" style={{fontWeight: 'bold'}} gutterBottom>
                {localeHeading}
              </Typography>
            )}
            <Box
              sx={{
                mt: 5,
                mb: 5,
              }}
            >
            {post.publishedAt && (
              <Typography variant="p" 
                sx={{
                    float: 'left',
                    verticalAlign: 'middle',
                    marginRight: {xs: '5%', md:'8%', lg:'10%'},
                    marginTop: {xs: '0%', md:'4%', lg:'2%'},
                    marginBottom: {xs: '5%', md:'5%', lg:'0%'},
                  }}>
                {format(parseISO(post.publishedAt), 'MMMM d, yyyy')}
              </Typography>
            )}
            {route && buttonText && (
              <RedirectButton
                  title={buttonText}
                  route={route}
                sx={{width: {xs: '100%', md: 180}, padding: '10px 20px'}}
              />
            )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

NewsCard.propTypes = {
  post: PropTypes.object,
  buttonText: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default NewsCard
