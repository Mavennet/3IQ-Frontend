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

function FundsOverview(props) {
  const {title, embed, currentLanguage, fundSidebarItem, endpoint} = props

  const [data, setData] = React.useState(null)

  const getKeyFacts = (endpoint) => {
    axios.get(endpoint)
      .then(response => setData(response.data))
  }

  React.useEffect(() => {
    if (endpoint) {
      getKeyFacts(endpoint)
    }
  }, [endpoint])

  return (
    <Box mt={8}>
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Grid container>
          <Grid item md={fundSidebarItem ? 8 : 12} pr={{xs: 0, md: 10}} mb={{xs: 6}}>
            {title && (
              <Typography component="h2" variant="h4" sx={{fontWeight: 'bold', color: '#0082E5'}}>
                {title}
              </Typography>
            )}
            {data && (
              <Box className={styles.simpleBlockContent} mt={4}>
                <table>
                  <tbody>
                    {Object.entries(data[0]).map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
    </Box>
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
