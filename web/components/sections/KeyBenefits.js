import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Card, CardContent, CardMedia, Container, Grid } from '@mui/material'
import SimpleBlockContent from '../SimpleBlockContent'
const builder = imageUrlBuilder(client)

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    h1: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    h5: {
      verticalAlign: 'middle',
      fontSize: '14px',
    },
    p: {
      fontSize: 16,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '15px 40px',
          fontFamily: 'Europa',
          fontSize: '20px',
          background: '#DC6E19',
          color: '#fff',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            border: 'none',
            color: '#fff!important',
            textDecoration: 'underline!important',
            textUnderlineOffset: '10px!important',
            fontWeight: '900',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      .simpleBlockContent {
        padding: 0px 20px;
      }

      .simpleBlockContent p {
        font-family: 'Europa';
        font-size: 14px
      }

      .simpleBlockContent a {
        font-family: 'Europa';
        color: #fff;
        text-decoration: none;
      }

      .simpleBlockContent a:hover {
        text-decoration: underline;
      }`,
    },
  },
})

function KeyBenefits(props) {
  const { title, benefits, currentLanguage } = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ mb: 8.6 }}
      >
        <Typography
          sx={{
            position: 'relative',
            fontWeight: 900,
            fontSize: 34,
            lineHeight: 'var(--font-title2-line-height)',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: 0,
            padding: 0,
            pt: '1.5rem',
            mb: '1.5rem',
            color: '#0082E4',
          }}
          align={'left'}
          gutterBottom
        >
          {title}
        </Typography>
        <Grid container spacing={2.5}>
          {benefits.map((b) => (
            <Grid key={b._id} item xs={6} md={3}>
              <Card sx={{
                p: 2.5, backgroundColor: '#E8E8EA', height: '99%',
                display: 'flex',
                // gap: '25px',
                flexDirection: 'column',
                alignItems: 'center'
              }} >
                <Typography align='center' sx={{
                  fontSize: 28,
                  lineHeight: 1,
                  minHeight: { xs: '1em', md: '2em' },
                  color: '#0082E4',
                  fontWeight: 400,
                  fontFamily: '"DM Serif Display", Sans-serif',
                  wordBreak: 'break-word'
                }}>
                  {b.heading[currentLanguage?.languageTag]}
                </Typography>
                <CardMedia
                  component="img"
                  src={builder.image(b.mainImage).url()}
                  sx={{
                    display: 'block',
                    mx: 'auto',
                    p: '20px',
                    mb: 1.25,
                    height: '90px',
                    width: '90px',
                    // justifyContent: 'center',
                  }}
                />
                <CardContent align='center' sx={{ padding: 0 }}>
                  <SimpleBlockContent blocks={b.body[currentLanguage?.languageTag]}></SimpleBlockContent>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider >
  )
}

KeyBenefits.propTypes = {
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.object,
      heading: PropTypes.object,
    })),
  title: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default KeyBenefits
