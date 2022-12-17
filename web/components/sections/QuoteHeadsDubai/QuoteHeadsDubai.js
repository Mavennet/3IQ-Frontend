import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container, Grid } from '@mui/material'
import Script from 'next/script'
import axios from 'axios'

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

  const [data_widget, setDataWidget] = React.useState(null)

  React.useEffect(() => {
    // var data, data2

    var url2 = "https://feeds.nasdaqdubai.com/apps/sso/source/qbtc650f605";

    (async () => { const pain = await axios.get(url2).then(response => setDataWidget(response.data)) })()


    // function processData(allText) {

    //   let array = allText[0];
    //   var headers = array.split(",");
    //   var values = allText[1].split(",");
    //   function createObjectFromArray(array, indexes) {
    //     let result = {};
    //     for (let index of indexes) {
    //       result[headers[index]] = values[index];
    //     }
    //     return result;
    //   }

    //   let recordObject = createObjectFromArray(allText[1], [0, 1, 2, 3, 4, 5]);

    //   return recordObject;
    // }

    // var units_outstanding_element = document.getElementById('Units_Outstanding');

    // var units_outstanding_processed = parseFloat(data2.Units).toFixed(2)
    // units_outstanding_processed = units_outstanding_processed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // units_outstanding_element.innerHTML += units_outstanding_processed;

    // var nav_usd_element = document.getElementById('nav_usd');
    // var nav_processed = parseFloat(data2.NetAssetValue).toFixed(2)

    // nav_processed = nav_processed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // nav_usd_element.innerHTML += nav_processed;

    // var navpu_usd_element = document.getElementById('navpu_usd');

    // navpu_usd_element.innerHTML += parseFloat(data2.NAVPU).toFixed(4);

    // console.log(data2.Date)
    // var b = new Date(data2.Date)
    // var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    // var result = b.toLocaleDateString("en-US", options)
    // console.log(result)

    // var date_element = document.getElementById('date_gcp');
    // var date_element2 = document.getElementById('date_gcp2');
    // var date_element3 = document.getElementById('date_gcp3');
    // date_element.innerHTML += result;
    // date_element2.innerHTML += result;
    // date_element3.innerHTML += result;

    // var units_per_btc = data2.Units / data2.Quantity;
    // var units_per_btc_ele = document.getElementById('units_per_btc');
    // units_per_btc_ele.innerHTML += parseFloat(units_per_btc).toFixed(2);

    // var btc_per_unit = data2.Quantity / data2.Units;
    // var btc_per_unit_ele = document.getElementById('btc_per_unit');
    // btc_per_unit_ele.innerHTML += parseFloat(btc_per_unit).toFixed(8);


  }, [])

  React.useEffect(() => {
    if (data_widget) {
      var display_price_ele = document.getElementById('display_price');

      display_price_ele.innerHTML += data_widget.root[0].display_price;

      var numerical_change_ele = document.getElementById('numerical_change');

      numerical_change_ele.innerHTML += data_widget.root[0].numerical_change;

      var percentage_change_ele = document.getElementById('percentage_change');

      percentage_change_ele.innerHTML += data_widget.root[0].percentage_change;

      var last_volume_ele = document.getElementById('last_volume');


      last_volume_ele.innerHTML += data_widget.root[0].last_volume;


      var time_of_last_update_ele = document.getElementById('time_of_last_update');

      time_of_last_update_ele.innerHTML += data_widget.root[0].time_of_last_update;

      var market_status_ele = document.getElementById('market_status');

      const status = data_widget.root[0].market_status.replace(/-/g, " ");

      console.log("status", status)
      market_status_ele.innerHTML += status

      var change_span_ele = document.getElementById('change-span')
      var change_arrow_ele = document.getElementById('change-arrow')

      if (data_widget.root[0].numerical_change >= 0) {
        change_span_ele.classList.add("qmod-ch-up");
        change_arrow_ele.classList.add('fa-arrow-circle-up')
      }
      else {
        change_span_ele.classList.add("qmod-ch-down");
        change_arrow_ele.classList.add('fa-arrow-circle-down')
      }
    }
  }, [data_widget])

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
              <h1 className="qmod-heading">The Bitcoin Fund (QBTC)</h1>
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
            {/* <Script src='./loadQBTCScript.js' async /> */}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider >
  )
}

QuoteHeadsDubai.propTypes = {
  currentLanguage: PropTypes.object,
}

export default QuoteHeadsDubai
