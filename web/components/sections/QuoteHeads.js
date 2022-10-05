import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container, Grid } from '@mui/material'
import Script from 'next/script'

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
        h1.qmod-heading {
          color: #ffffff;
          background-color: #0082e5;
        }
        .pure-g [class*="pure-u"] {
          background-color: #E8E8EA;
          padding-bottom: 20px !important;
        }
      `,
    },
  },
})

function QuoteHeads({ symbols }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ mt: 15, mb: 8.6 }}>
        <Grid container spacing={2.5}>
          {symbols.map((s) => {
            const params = `{"symbol":"${s}"}`
            return (<Grid key={`${s}`} item xs={12} md={6} sx={{ '& > div': { maxWidth: '70%', mx: 'auto' } }}>
              <div className="quoteyeah" height="228">
                <div data-qmod-tool="quotehead" data-qmod-params={params} className="qtool"></div>
              </div>
              <Script id="qmod" type="application/javascript" src="https://qmod.quotemedia.com/js/qmodLoader.js"
                data-qmod-wmid="104183" data-qmod-env="app" data-qmod-version="v1.37.0" async />
            </Grid>)
          })}
        </Grid>
      </Container>
    </ThemeProvider >
  )
}

QuoteHeads.propTypes = {
  symbols: PropTypes.arrayOf(PropTypes.string),
}

export default QuoteHeads
