import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Box } from '@mui/material'
import { CSVLink } from 'react-csv'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import axios from 'axios'
import { format } from 'date-fns'
import styles from './styles.module.scss'
import { TfiDownload } from 'react-icons/tfi'
import { ResponsiveLine } from '@nivo/line'

function LineChart(props) {
  const {
    heading,
    description,
    desktopSize = 12,
    mobileSize = 12,
    chartHeight = '300',
    chartColor,
    endpoint,
    currentLanguage,
  } = props

  const colors = [chartColor ? chartColor : '#0082E5', '#DC6E19', '#869D7A', '#FF2205']

  const [data, setData] = React.useState()

  const convertDate = (value) => {
    const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
    const dt = value.split('/')
    const newYears = new Date(parseInt(dt[2]), parseInt(dt[0]) - 1, parseInt(dt[1]), 12)
    const isEng = currentLanguage.name === "EN"
    const formattedDate = format(newYears, isEng ? 'MMM dd yyyy' : 'dd MMM yyyy', {
      locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
    })
    !isEng && formattedDate.toLocaleLowerCase('fr')
    return formattedDate
  }

  const getChartData = () => {
    axios.get(endpoint).then((response) => setData(response.data))
  }

  React.useEffect(() => {
    getChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataSet = (value) => {
    const datasets = []
    let count = 0
    if (value) {
      value.map((item) => {
        let entries = Object.entries(item)
        let newData = []
        entries.map(([key, val] = entry) => {
          if (key !== 'label') {
            newData.push({
              x: key,
              y: val.toString()
            })
          }
        })
        datasets.push({
          id: item.label,
          color: colors[count],
          data: newData.slice(0,6),
        })
        count = count + 1
        return null
      })
    }
    return datasets
  }

  return (
    <Grid item xs={mobileSize} md={desktopSize} py={6} sx={{ fontFamily: 'Europa' }}>
      <Grid container sx={{ flexDirection: 'unset' }}>
        {heading && (
          <Grid item mb={4}>
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
          </Grid>
        )}
        {data && (
          <Grid item xs={12} mb={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <CSVLink
              data={data}
              filename={`line-chart.csv`}
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
          </Grid>
        )}
        <Grid item xs={12}>
          {
            data && (
              <Box
                sx={{
                  height: `${chartHeight}px`
                }}
              >
                <ResponsiveLine
                  colors={{ datum: 'color' }}
                  data={dataSet(data)}
                  margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
                  xScale={{
                    type: 'point'
                  }}
                  yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                  }}
                  axisLeft={{ format: v => `$ ${v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` }}
                  axisBottom={{
                    format: v => convertDate(v),
                  }}
                  pointSize={10}
                  pointBorderWidth={2}
                  pointColor={'var(--background-color)'}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'top-left',
                      direction: 'row',
                      justify: false,
                      translateX: 0,
                      translateY: 0,
                      itemsSpacing: 40,
                      itemWidth: 80,
                      itemHeight: -50,
                      itemOpacity: 0.75,
                      symbolSize: 20,
                      symbolShape: 'square',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                />
              </Box>
            )
          }
        </Grid>
        {description && (
          <Grid item>
            <div className={styles.simpleBlockContent}>
              <br />
              <SimpleBlockContent blocks={description} />
            </div>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

LineChart.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  chartColor: PropTypes.string,
  desktopSize: PropTypes.number,
  mobileSize: PropTypes.number,
  chartHeight: PropTypes.string,
  endpoint: PropTypes.string,
  currentLanguage: PropTypes.object,
}

export default LineChart
