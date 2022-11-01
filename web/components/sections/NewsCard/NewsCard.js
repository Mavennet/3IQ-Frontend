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
import {format} from 'date-fns'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './NewsCard.module.css'

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

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function NewsCard(props) {
  const {post, buttonText, route, currentLanguage, isInvertedLayout, shortDescription} = props

  const localeHeading = post.heading[currentLanguage.languageTag]

  const [publishedDate, setPublishedDate] = React.useState('')

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post.publishedAt)
      const isEng = currentLanguage.name === "EN"
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
        locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
      })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, post.publishedAt])

  if (isInvertedLayout) {
    // INVERTED LAYOUT
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{flexDirection: {xs: 'column-reverse', sm: 'unset'}}}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={6} square>
            <Box
              sx={{
                mt: {xs: 4, md: 8},
                mb: {xs: 0, md: 2},
                ml: {xs: 2, md: 10},
                mr: {xs: 0, md: 8},
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
              {shortDescription && (
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={shortDescription} />
                </div>
              )}
              <Box
                sx={{
                  mt: 5,
                  mb: 5,
                }}
              >
              {publishedDate && (
                <Typography variant="p"
                  sx={{
                      float: 'left',
                      verticalAlign: 'middle',
                      marginRight: {xs: '5%', md:'8%', lg:'10%'},
                      marginTop: {xs: '0%', md:'4%', lg:'2%'},
                      marginBottom: {xs: '5%', md:'5%', lg:'0%'},
                      fontSize: '16px',
                    }}>
                  {publishedDate}
                </Typography>
              )}
              {route && buttonText && (
                <RedirectButton
                    title={buttonText}
                    route={route}
                  sx={{width: {xs: '96%', md: 180}, padding: '10px 20px', fontSize: '16px'}}
                />
              )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            py={{xs: 28, md: 0}}
            sm={4}
            md={6}
            sx={{
              background:
                post.mainImage && `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
              backgroundSize: 'cover',
              bgcolor: '#091b3f',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: {xs: 'flex-end', md: 'center'},
              alignItems: 'center',
            }}
          >
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }

  // ORIGINAL LAYOUT
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{flexDirection: 'unset'}}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          py={{xs: 28, md: 0}}
          sm={4}
          md={6}
          sx={{
            background:
              post.mainImage && `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
            backgroundSize: 'cover',
            bgcolor: '#091b3f',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: {xs: 'flex-start', md: 'center'},
            alignItems: 'center',
          }}
        >
        </Grid>
        <Grid item xs={12} sm={8} md={6} square>
          <Box
            sx={{
              mt: {xs: 4, md: 8},
              mb: {xs: 0, md: 2},
              ml: {xs: 2, md: 10},
              mr: {xs: 0, md: 8},
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
            {shortDescription && (
              <div className={styles.simpleBlockContent}>
                <SimpleBlockContent blocks={shortDescription} />
              </div>
            )}
            <Box
              sx={{
                mt: 5,
                mb: 5,
              }}
            >
            {publishedDate && (
              <Typography variant="p"
                sx={{
                    float: 'left',
                    verticalAlign: 'middle',
                    marginRight: {xs: '5%', md:'8%', lg:'10%'},
                    marginTop: {xs: '0%', md:'4%', lg:'2%'},
                    marginBottom: {xs: '5%', md:'5%', lg:'0%'},
                    fontSize: '16px',
                  }}>
                {publishedDate}
              </Typography>
            )}
            {route && buttonText && (
              <RedirectButton
                  title={buttonText}
                  route={route}
                sx={{width: {xs: '96%', md: 180}, padding: '10px 20px', fontSize: '16px'}}
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
  buttonText: PropTypes.string,
  currentLanguage: PropTypes.object,
  route: PropTypes.object,
  isInvertedLayout: PropTypes.bool,
  shortDescription: PropTypes.object,
}

export default NewsCard
