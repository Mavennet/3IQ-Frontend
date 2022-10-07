import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TableSection.module.css'
import axios from 'axios'

function TableSection(props) {
  const {
    heading,
    embed,
    colorfulLayout,
    headerTransparentLayout,
    endpoint,
    headers,
    currentLanguage,
    headerFundPerformance
  } = props

  const [data, setData] = React.useState(null)

  const getTableData = (endpoint) => {
    axios.get(endpoint)
      .then(response => setData(response.data))
  }

  React.useEffect(() => {
    if (endpoint) {
      getTableData(endpoint)
    }
  }, [endpoint])

  return (
    <Grid container py={6} sx={{ fontFamily: 'Europa' }}>
      {
        heading && (
          <Grid item xs={12} mb={4}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 34,
                fontFamily: 'Europa',
                color: '#0082E5',
                fontWeight: '900'
              }}
            >{heading}</Typography>
          </Grid>
        )
      }
      {
        headerFundPerformance && (
          <Grid item xs={12} mt={5}>

            <div className={styles.fundPerformanceHeader}>
              <div className={styles.firstCell}></div>
              <div className={styles.secondCell}>
                <p>Total Returns</p>
              </div>
              <div className={styles.thirdCell}>
                <p>Annualized Returns</p>
              </div>
            </div>

          </Grid>
        )
      }
      {
        data && (
          <Grid item xs={12}>
            <div className={styles.simpleBlockContent}>
              <table>
                {
                  headers && (
                    <thead className={headerTransparentLayout && styles.headerTransparent}>
                      <tr>
                        {
                          headers.map((item) => {
                            return (
                              <th key={item._key}>{item[currentLanguage?.languageTag]}</th>
                            )
                          })
                        }
                      </tr>
                    </thead>
                  )
                }
                <tbody className={colorfulLayout && styles.tableColorful}>
                  {
                    data.map((item, i) => {
                      const values = Object.values(item)
                      const keys = Object.keys(item)
                      return (
                        <tr key={i}>
                          {
                            values.map((item, i) => {
                              return (
                                <td key={i}>{ keys[i] === 'cad' || keys[i] === 'usd' ? `\$ ${parseFloat(item).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`: item}</td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </Grid>
        )
      }
      {
        embed && (
          <Grid item xs={12} mb={3}>
            <div className={styles.simpleBlockContent}>
              <SimpleBlockContent blocks={embed} />
            </div>
          </Grid>
        )
      }
    </Grid>
  )
}

TableSection.propTypes = {
  heading: PropTypes.string,
  embed: PropTypes.object,
  colorfulLayout: PropTypes.bool,
  headerTransparentLayout: PropTypes.bool,
  endpoint: PropTypes.string,
  headers: PropTypes.array,
  currentLanguage: PropTypes.object,
  headerFundPerformance: PropTypes.bool
}

export default TableSection
