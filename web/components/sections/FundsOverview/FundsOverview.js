import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FundSidebarItem from '../../FundSidebarItem/FundSidebarItem'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './FundsOverview.module.css'
import { Typography } from '@mui/material'
import axios from 'axios'
import { format } from 'date-fns'

function FundsOverview(props) {
  const {title, embed, currentLanguage, fundSidebarItem, endpoint} = props

  const [data, setData] = React.useState(null)

  const getKeyFacts = (endpoint) => {
    axios.get(endpoint)
      .then(response => setData(response.data))
  }

  const convertDate = (value) => {
    const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
    const newYears = new Date(`${value} 12:00:00:00`)
    const formattedDate = format(newYears, 'MMMM dd, yyyy', {
      locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
    })
    return formattedDate
  }

  React.useEffect(() => {
    if (endpoint) {
      getKeyFacts(endpoint)
    }
  }, [endpoint])

  return (
    <Grid xs={12} mt={8}>
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Grid container>
          <Grid item md={fundSidebarItem ? 8 : 12} pr={{xs: 0, md: 10}} mb={{xs: 6}}>
            {title && (
              <Typography component="h2" variant="h4" sx={{ fontWeight: 'bold', color: '#0082E5' }}>
                {title}
              </Typography>
            )}
            {data && (
              <Box className={styles.simpleBlockContent} mt={4}>
                <table>
                  <tbody>
                    {Object.entries(data[0].en_CA ? data[0][currentLanguage.languageTag.startsWith('en') ? 'en_CA' : currentLanguage.languageTag] : data[0]).map((item, key) => {
                      const keysToExpand = ['UnitsOutstanding', 'BTCPerUnit', 'UnitsPerBTC', 'UnitsPerETH', 'ETHPerUnit']
                      const keysExpanded = ['Units Outstanding', 'BTC per Unit', 'Units per BTC', 'Units per ETH', 'ETH per Unit']
                      const frenchKeys = ['Unités en circulation', 'BTC Par Unité', 'Unités Par BTC', 'Unités Par ETH', 'ETH Par Unité']
                      const indexOfKey = keysToExpand.indexOf(item[0]) === -1 ? frenchKeys.indexOf(item[0]) : keysToExpand.indexOf(item[0])
                      const isExpandKey = keysToExpand.includes(item[0])
                      const isFrenchKey = frenchKeys.includes(item[0])
                      let expandValue
                      if ((isExpandKey || isFrenchKey) && indexOfKey === 0) { expandValue = `${parseFloat(item[1]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ‡` }
                      else if ((isExpandKey || isFrenchKey) && (indexOfKey === 1 || indexOfKey === 4)) { expandValue = `${parseFloat(item[1]).toFixed(8)} ‡` }
                      else { expandValue = `${parseFloat(item[1]).toFixed(2)} ‡` }

                      return (
                        <tr key={key}>
                          <td>{isExpandKey ? keysExpanded[indexOfKey] : item[0]}</td>
                          <td>{isExpandKey || isFrenchKey ? expandValue : item[1]}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Box>
            )}
            {data && data[0].date && (
              <Box sx={{ mt: 2 }}>
                <Typography align='right' sx={{color:'#77757F'}}>{`‡ ${convertDate(data[0].date)}`}</Typography>
              </Box>
            )}
            {embed && (
              <Box className={styles.simpleBlockContent}>
                <SimpleBlockContent blocks={embed} />
              </Box>
            )}
          </Grid>
          <Grid item container md={4}>
            {fundSidebarItem &&
              fundSidebarItem.map((fundItem, index) => (
                <FundSidebarItem
                  key={`fundSidebarItem_${index}`}
                  {...fundItem}
                  languageTag={currentLanguage.languageTag}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

FundsOverview.propTypes = {
  title: PropTypes.object,
  embed: PropTypes.object,
  currentLanguage: PropTypes.object,
  fundSidebarItem: PropTypes.array,
  endpoint: PropTypes.string
}

export default FundsOverview
