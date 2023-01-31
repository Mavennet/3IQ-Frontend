import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Box, Container } from '@mui/material'
import styles from './styles.module.scss'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { TfiDownload } from 'react-icons/tfi'

function TableCripto(props) {
  const {
    heading,
    description,
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
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg', xl: 'xl' } }}>
      <Grid container py={6}>
        <Grid item xs={12} mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {
            heading && (
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-primary-lg)',
                  color: 'var(--black)',
                }}
              >
                {heading}
              </Typography>
            )
          }
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
                fontSize: '20px',
                margin: '20px 0px'
              }}
            >
              <TfiDownload
                size={15}
                className={styles.download__icon}
              />
              Download
            </CSVLink>
          </>
        </Grid>
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
                            <td className={styles.fixed__mobile}>
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
                            </td>
                            <td className={styles.price}>{item.price}</td>
                            <td className={styles.price}>{item.index}</td>
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
        {
          description && (
            <Grid item xs={12} mt={2}>
              <div className={styles.simple__block__content}>
                <SimpleBlockContent blocks={description} />
              </div>
            </Grid>
          )
        }
      </Grid>
    </Container>
  )
}

TableCripto.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  endpoint: PropTypes.string,
  headers: PropTypes.array,
  currentLanguage: PropTypes.object
}

export default TableCripto

