import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Container, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import axios from 'axios'
import { format } from 'date-fns'
import { CSVLink } from 'react-csv'
import { TfiDownload } from 'react-icons/tfi'

function TableSection(props) {
  const {
    heading,
    embed,
    colorfulLayout,
    color,
    headerTransparentLayout,
    downloadButton,
    endpoint,
    headers,
    currentLanguage,
    headerFundPerformance
  } = props

  const [data, setData] = React.useState(null)

  const typesStyle = {
    orange: styles.orange,
    lightBlue: styles.light__blue,
    darkBlue: styles.dark__blue
  }

  const getTableData = (endpoint) => {
    axios.get(endpoint)
      .then(response => response.data[currentLanguage.languageTag] ? setData([response.data[currentLanguage.languageTag]]) : setData(response.data))
  }

  const isDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
      return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }

    return date.toISOString().startsWith(dateStr);
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

  React.useEffect(() => {
    if (endpoint) {
      getTableData(endpoint)
    }
  }, [endpoint])

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
      <Grid container mb={6}>
        {
          heading && (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-primary-lg)',
                  color: 'var(--black)',
                }}
              >{heading}</Typography>
              {
                downloadButton && embed && (
                  <>
                    <CSVLink
                      data={data ? data : []}
                      filename={`table.csv`}
                      target="_blank"
                      style={{
                        textAlign: 'center',
                        background: 'transparent',
                        border: '2px solid #091B3F',
                        color: '#091B3F',
                        textDecoration: 'none',
                        padding: '5px 25px',
                        borderRadius: '4px',
                        fontSize: '20px'
                      }}
                    >
                      <TfiDownload
                        size={15}
                        className={styles.download__icon}
                      />
                      Download
                    </CSVLink>
                  </>

                )
              }
            </Grid>
          )
        }
        {
          headerFundPerformance && (
            <Grid item xs={12} mt={5}>
              <div className={styles.fundPerformanceHeader}>
                <div className={styles.firstCell}></div>
                <div className={styles.secondCell}>
                  <p>{currentLanguage?.languageTag.startsWith('en') ? 'Total Returns' : 'Retours totaux'}</p>
                </div>
                <div className={styles.thirdCell}>
                  <p>{currentLanguage?.languageTag.startsWith('en') ? 'Annualized Returns' : 'Rendements annualisés'}</p>
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
                  <tbody className={colorfulLayout && `${styles.tableColorful} ${typesStyle[color]}`}>
                    {console.log(data)}
                    {
                      data.map((item, i) => {
                        const values = Object.values(item)
                        const keys = Object.keys(item)
                        return (
                          <tr key={i}>
                            {
                              values.map((item, i) => {
                                return (keys[i] !== 'dateDaily' &&
                                  <td key={i}>
                                    <div className={styles.bg}>
                                      {
                                        (keys[i] === 'cad' || keys[i] === 'usd') && parseFloat(item) > 1000
                                          ? `$${parseFloat(item).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                          : (keys[i] === 'cad' || keys[i] === 'usd') && parseFloat(item) < 1000 ? `$${parseFloat(item).toFixed(4)}`
                                            : isDate(item)
                                              ? convertDate(item)
                                              : item
                                      }
                                    </div>
                                  </td>
                                )
                              })
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {data[0].dateDaily && (
                  <Box sx={{ mt: 2 }}>
                    <Typography align='right' sx={{ color: '#77757F' }}>{`${currentLanguage.name === 'EN' ? 'Price as at' : 'Prix au'} ${convertDate(data[0].dateDaily)}`}</Typography>
                  </Box>
                )}
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
    </Container>
  )
}

TableSection.propTypes = {
  heading: PropTypes.string,
  embed: PropTypes.object,
  color: PropTypes.string,
  colorfulLayout: PropTypes.bool,
  headerTransparentLayout: PropTypes.bool,
  downloadButton: PropTypes.bool,
  endpoint: PropTypes.string,
  headers: PropTypes.array,
  currentLanguage: PropTypes.object,
  headerFundPerformance: PropTypes.bool
}

export default TableSection
