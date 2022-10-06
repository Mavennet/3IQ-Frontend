import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Box } from '@mui/material'
import styles from './TableCripto.module.css'
import axios from 'axios'

function TableCripto(props) {
  const {
    heading,
    endpoint,
    headers,
    currentLanguage,
  } = props

  const [data, setData] = React.useState([])

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
        data && (
          <Grid item xs={12}>
            <div className={styles.simpleBlockContent}>
              <table>
                {
                  headers && (
                    <thead>
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
                <tbody>
                  {
                    data.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div className={styles.criptoInfo}>
                              <Box
                                component="img"
                                alt={item.currency}
                                src={item.image.small}
                                sx={{
                                  marginRight: '10px',
                                  width: '25px',
                                }}
                              />
                              {item.currency}
                            </div>
                            <strong>{item.price}</strong>
                          </td>
                          <td>{item.index}</td>
                          <td>{item.weight}</td>
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
  )
}

TableCripto.propTypes = {
  heading: PropTypes.string,
  endpoint: PropTypes.string,
  headers: PropTypes.array,
  currentLanguage: PropTypes.object
}

export default TableCripto

