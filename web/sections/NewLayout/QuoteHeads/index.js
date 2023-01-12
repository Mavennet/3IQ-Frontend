import React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@mui/material'
import styles from './styles.module.scss'
import { BsFillArrowDownLeftCircleFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import axios from 'axios'
import { format } from 'date-fns'

function QuoteHeads({ orangeBoxEndpoint, greenBoxEndpoint, currentLanguage, volumeText, dateText }) {

  const [orangeBoxData, setOrangeBoxData] = React.useState(null)
  const [greenBoxData, setGreenBoxData] = React.useState(null)

  const getOrangeData = (endpoint) => {
    axios.get(endpoint)
      .then(response => setOrangeBoxData(response.data))
  }

  const getGreenData = (endpoint) => {
    axios.get(endpoint)
      .then(response => setGreenBoxData(response.data))
  }

  const convertDate = (value) => {
    const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
    const dt = value.split('-')
    const newYears = new Date(parseInt(dt[0]), parseInt(dt[1]) - 1, parseInt(dt[2]), 12)
    const isEng = currentLanguage.name === "EN"
    const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
      locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
    })
    !isEng && formattedDate.toLocaleLowerCase('fr')
    return formattedDate
  }

  const toCurrency = (value) => {
    return parseFloat(value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const returnKeys = (object) => {
    var str = ''
    for (var word in object) {
      if (Object.prototype.hasOwnProperty.call(object, word)) {
        str += object[word] + ' | '
      }
    }
    return str;
  }

  React.useEffect(() => {
    if (orangeBoxEndpoint) {
      getOrangeData(orangeBoxEndpoint)
    }
  }, [orangeBoxEndpoint])

  React.useEffect(() => {
    if (greenBoxEndpoint) {
      getGreenData(greenBoxEndpoint)
    }
  }, [greenBoxEndpoint])

  return (
    <Grid xs={12} md={5} lg={6}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {
              orangeBoxData && (
                <>
                  <div className={styles.circle__top}></div>
                  <div className={`${styles.box} ${styles.orange}`}>
                    <Grid container>
                      <Grid item xs={9}>
                        <h5>{orangeBoxData.results.quote[0].equityinfo.longname}</h5>
                        <h2>{toCurrency(orangeBoxData.results.quote[0].pricedata.vwap)} <small>{orangeBoxData.results.quote[0].pricedata.change}({orangeBoxData.results.quote[0].pricedata.changepercent.toFixed(2)}%)</small></h2>
                        <div className={styles.info}>
                          <div>
                            <label>{dateText && dateText}</label>
                            <h5><strong>{convertDate(orangeBoxData.results.quote[0].datetime)}</strong></h5>
                          </div>
                          <div>
                            <label>{volumeText && volumeText}</label>
                            <h5><strong>{orangeBoxData.results.quote[0].pricedata.tradevolume}</strong></h5>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <BsFillArrowDownLeftCircleFill
                          size={60}
                          color={'var(--orange)'}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div className={styles.footer}>
                          <p>{returnKeys(orangeBoxData.results.quote[0].key)}</p>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </>
              )
            }
            {
              greenBoxData && (
                <>
                  <div className={`${styles.box} ${styles.green}`}>
                    <Grid container>
                      <Grid item xs={9}>
                        <h5>{greenBoxData.results.quote[0].equityinfo.longname}</h5>
                        <h2>{toCurrency(greenBoxData.results.quote[0].pricedata.vwap)} <small>{orangeBoxData.results.quote[0].pricedata.change}({orangeBoxData.results.quote[0].pricedata.changepercent.toFixed(2)}%)</small></h2>
                        <div className={styles.info}>
                          <div>
                            <label>{dateText && dateText}</label>
                            <h5><strong>{convertDate(greenBoxData.results.quote[0].datetime)}</strong></h5>
                          </div>
                          <div>
                            <label>{volumeText && volumeText}</label>
                            <h5><strong>{greenBoxData.results.quote[0].pricedata.tradevolume}</strong></h5>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <BsFillArrowUpRightCircleFill
                          size={60}
                          color={'#009A93'}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div className={styles.footer}>
                          <p>{returnKeys(greenBoxData.results.quote[0].key)}</p>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className={styles.circle__down}></div>
                </>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

QuoteHeads.propTypes = {
  orangeBoxEndpoint: PropTypes.string,
  greenBoxEndpoint: PropTypes.string,
  dateText: PropTypes.object,
  volumeText: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default QuoteHeads
