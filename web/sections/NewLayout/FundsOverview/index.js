import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import FundSidebarItem from '../../../components/NewLayout/FundSidebarItem'
import axios from 'axios'
import { format } from 'date-fns'
import { Typography } from '@mui/material'

function FundsOverview(props) {
  const { title, embed, fundSidebarItem, currentLanguage, endpoint } = props

  const [data, setData] = React.useState(null)

  const getKeyFacts = (endpoint) => {
    axios.get(endpoint)
      .then(response => setData(response.data))
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
      getKeyFacts(endpoint)
    }
  }, [endpoint])

  return (
    <Grid xs={12} md={fundSidebarItem ? 12 : 7} lg={fundSidebarItem ? 12 : 6}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container>
          <Grid item md={fundSidebarItem ? 8 : 12} pr={{xs: 0, md: fundSidebarItem ? 10 : 0}} mb={{xs: 6}}>
            {title && (<h2 className={styles.title}>{title}</h2>)}
            {embed && (
              <Box className={styles.content}>
                <SimpleBlockContent blocks={embed} />
              </Box>
            )}
            {data && (
              <Box className={styles.key__table} mt={4}>
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
              <Box sx={{ mt: 4 }}>
                <Typography
                  align='left'
                  sx={{
                    color: 'var(--black)',
                    fontFamily: 'var(--font-family-secondary)',
                    fontSize: 'var(--font-size-secondary-md)',
                  }}
                >{`‡ ${convertDate(data[0].date)}`}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item md={4}>
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
