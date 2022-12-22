import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container, Grid } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 16,
    },
  },
  components: {
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

function Note({ name, leftTextBlock, rightTextBlock }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ mt: 15, mb: 8.6 }}>
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
          {name}
        </Typography>
        <Grid container spacing={2.5}>
          <Grid sx={{
            '& > p > a': {
              color: '#0f4b7d !important',
              boxShadow: 'none',
              textDecoration: 'none'
            }
          }}
            xs={12} md={6} item>
            <SimpleBlockContent blocks={leftTextBlock}></SimpleBlockContent>
          </Grid>
          <Grid sx={{
            '& > ol > li > a': {
              color: '#0f4b7d !important',
              boxShadow: 'none',
              textDecoration: 'none'
            }
          }} xs={12} md={6} item>
            <SimpleBlockContent blocks={rightTextBlock}></SimpleBlockContent>
          </Grid>

        </Grid>
      </Container>
    </ThemeProvider >
  )
}

Note.propTypes = {
  name: PropTypes.object,
  rightTextBlock: PropTypes.object,
  leftTextBlock: PropTypes.object,
}

export default Note
