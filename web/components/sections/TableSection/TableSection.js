import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TableSection.module.css'
import axios from 'axios'

function TableSection(props) {
  const {
    name,
    embed,
    isEnableName,
    colorfulLayout,
    headerTransparentLayout,
    endpoint,
    headers,
    currentLanguage

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
    <Container>
      <Grid container py={6}>
        {
          isEnableName && (
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: 34,
                  fontFamily: 'Europa',
                  color: '#0082E5',
                  fontWeight: '900'
                }}
              >{name}</Typography>
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
                        return (
                          <tr key={i}>
                            {
                              values.map((item, i) => {
                                return (
                                  <td key={i}>{item}</td>
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
      </Grid>
    </Container>
  )
}

TableSection.propTypes = {
  name: PropTypes.string,
  embed: PropTypes.object,
  isEnableName: PropTypes.bool,
  colorfulLayout: PropTypes.bool,
  headerTransparentLayout: PropTypes.bool,
  endpoint: PropTypes.string,
  headers: PropTypes.array,
  currentLanguage: PropTypes.object
}

export default TableSection
