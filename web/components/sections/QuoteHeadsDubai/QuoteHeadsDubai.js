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

function QuoteHeadsDubai({ currentLanguage }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ mt: 15, mb: 8.6 }}>
        <Grid container spacing={2.5}>
          <Grid key={`qhead1`} item xs={12} md={6} sx={{ '& > div': { maxWidth: '70%', mx: 'auto' } }}>
            <div className="quoteyeah" height="228">
              <div data-qmod-tool="quotehead" data-qmod-params={`{"lang":"${currentLanguage.name.toLowerCase()}",  "symbol":"QBTC.U"}`} className="qtool"></div>
            </div>
            <Script id="qmod" type="application/javascript" src="https://qmod.quotemedia.com/js/qmodLoader.js"
              data-qmod-wmid="104183" data-qmod-env="app" data-qmod-version="v1.37.0" async />
          </Grid>
          <Grid key={`qhead2`} item xs={12} md={6} sx={{ '& > div': { maxWidth: '70%', mx: 'auto' } }}>
            <div className="qmod-quotehead">
              <div className="pure-g">
                <div className="pure-u-1">
                  <div className="qmod-head-left">
                    <div className="qmod-mkt-hours">
                      <div className="qmod-mkt-top">
                        <span className="qmod-last">
                          $<span id="display_price"></span></span>
                        <span id="change-span" className="qmod-change">
                          <span id="change-arrow" className="qmod-change-icon fa"></span><span
                            id="numerical_change"></span> <span className="qmod-pipe-sep"> | </span><span
                              id="percentage_change"></span>%</span>
                      </div>
                      <div className="qmod-mkt-mid"></div>

                      <div className="qmod-mkt-btm">
                        <span className="qmod-datetime" id="time_of_last_update"></span>
                        Volume: <span className="qmod-volume" id="last_volume"><span className="qmod-sm-hide"></span></span>
                      </div>
                    </div>
                    <div className="qmod-entline">
                      <span className="qmod-ent-item"><span>USD</span></span> | NASDAQ DUBAI STOCK EXCHANGE | REAL TIME PRICE
                      | <span id="market_status"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Script src='./loadQBTCScript.js' async />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider >
  )
}

QuoteHeadsDubai.propTypes = {
  symbols: PropTypes.arrayOf(PropTypes.string),
  currentLanguage: PropTypes.object,
}

export default QuoteHeadsDubai
