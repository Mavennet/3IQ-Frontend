import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import {Grid, Typography} from '@mui/material'
import RedirectButton from '../../RedirectButton/RedirectButton'
import Chart from 'chart.js/auto'
import {CSVLink} from 'react-csv'
import * as XLSX from 'xlsx'
import SimpleBlockContent from '../../SimpleBlockContent'
import axios from 'axios'
import {format} from 'date-fns'

function LineChart(props) {
  const {
    heading,
    description,
    desktopSize = 12,
    mobileSize = 12,
    chartHeight = '120',
    endpoint,
    currentLanguage,
  } = props

  const colors = ['#0082E5', '#dc6e19', '#869D7A', '#FF2205']

  const [data, setData] = React.useState()

  const canvasEl = React.useRef(null)

  const convertDate = (value) => {
    const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
    const newYears = new Date(value)
    const formattedDate = format(newYears, 'MMMM dd, yyyy', {
      locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
    })
    return formattedDate
  }

  const dataSet = (value) => {
    const datasets = []
    let count = 0
    if (value) {
      value.map((item) => {
        const {label} = item
        delete item.label
        datasets.push({
          backgroundColor: 'transparent',
          label: label,
          data: Object.keys(item)
            .filter((k) => k !== label)
            .sort((a, b) => {
              a = a.split('/')
              b = b.split('/')
              return a[2] - b[2] || a[0] - b[0] || a[1] - b[1]
            })
            .reduce((o, sortedKey) => {
              return {...o, [convertDate(sortedKey)]: item[sortedKey]}
            }, {}),
          fill: true,
          borderWidth: 1,
          borderColor: colors[count],
          lineTension: 1,
          pointBackgroundColor: colors[count],
          pointRadius: 1,
        })
        count = count + 1
        return null
      })
    }
    return {datasets}
  }

  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'line-chart.xlsx')
  }

  const getChartData = () => {
    axios.get(endpoint).then((response) => setData(response.data))
  }

  React.useEffect(() => {
    getChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (data) {
      const ctx = canvasEl.current.getContext('2d')

      const dataChart = dataSet(data)

      const config = {
        type: 'line',
        data: dataChart,
        options: {
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 6,
                includeBounds: true,
              },
            },
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  const label = dataChart.datasets[0].label
                  const hasDollar =
                    label === 'Index Value^' || label === 'NAVPU *' || label === 'Market Price **'
                  return hasDollar
                    ? '$' + value
                    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                pointStyle: 'line',
                usePointStyle: true,
                padding: 20,
                pointStyleWidth: 25,
              },
            },
          },
        },
      }

      const myLineChart = new Chart(ctx, config)

      return function cleanup() {
        myLineChart.destroy()
      }
    }
  }, [data])

  return (
        <Grid item xs={mobileSize} md={desktopSize} py={6} sx={{fontFamily: 'Europa'}}>
          <Grid container sx={{flexDirection: 'unset'}}>
            <CssBaseline />
            {heading && (
              <Grid item mb={4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: 34,
                    fontFamily: 'Europa',
                    color: '#0082E5',
                    fontWeight: '900',
                    minHeight: '2em',
                  }}
                >
                  {heading}
                </Typography>
              </Grid>
            )}
            {data && (
              <Grid item xs={12} mb={4} sx={{display: 'flex', justifyContent: 'flex-end', gap: 1}}>
                <CSVLink
                  data={data}
                  filename={`line-chart.csv`}
                  target="_blank"
                  style={{
                    textAlign: 'center',
                    background: '#dc6e19',
                    border: '3px solid #dc6e19',
                    fontFamily: 'Europa',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0px 10px',
                    borderRadius: '4px',
                  }}
                >
                  CSV
                </CSVLink>
                <div onClick={() => downloadExcel()}>
                  <RedirectButton
                    title={'Excel'}
                    // route={route}
                    sx={{padding: '1px 5px', fontSize: '14px', fontWeight: '300'}}
                  />
                </div>
              </Grid>
            )}
            <Grid item xs={12} mb={4}>
              <canvas id="myChart" ref={canvasEl} height={chartHeight} />
            </Grid>
            {description && (
              <Grid item>
                <SimpleBlockContent blocks={description} />
              </Grid>
            )}
          </Grid>
        </Grid>
  )
}

LineChart.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  desktopSize: PropTypes.number,
  mobileSize: PropTypes.number,
  chartHeight: PropTypes.string,
  endpoint: PropTypes.string,
  currentLanguage: PropTypes.object,
}

export default LineChart
