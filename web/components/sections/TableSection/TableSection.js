import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TableSection.module.css'
import mock from './mock.json'

function TableSection(props) {
  const { name, embed, isEnableName } = props

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setData(mock)
  }, [])

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
                  <tbody className={styles.tableColorful}>
                    {
                      data.body.map((item,i) => {
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
  isEnableName: PropTypes.bool
}

export default TableSection
