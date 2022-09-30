import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid, Typography, Container } from '@mui/material'
import RedirectButton from '../../RedirectButton/RedirectButton'
import Chart from "chart.js/auto"
import mock from './mock.json'
// import { CSVLink } from "react-csv"
import * as XLSX from 'xlsx'
import SimpleBlockContent from '../../SimpleBlockContent'

function LineChart(props) {
  const {
    heading,
    description,
    desktopSize = 12,
    mobileSize = 12,
    lineColor = "#0082E5",
    chartHeight = '120',
    // endpoint
  } = props

  const [data, setData] = React.useState()

  const canvasEl = React.useRef(null)

  const dataChart = (value) => {
    const data = []
    for (const [val] of Object.entries(value)) {
      data.push(isNaN(val) ? parseFloat(val) : "")
    }
    return {data: data}
  }

  const dataSet = (value) => {
    const labels = []
    const dataSet = []
    if (value) {
      value.map((item) => {
        labels.push(
          item.label
        )
        dataSet.push({
          backgroundColor: 'transparent',
          label: item.label,
          data: dataChart(item.data).data,
          fill: true,
          borderWidth: 2,
          borderColor: lineColor,
          lineTension: 0.2,
          pointBackgroundColor: lineColor,
          pointRadius: 3
        })
        return null
      })
    }
    return {data: dataSet, labels: labels}
  }

  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(mock.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "line-chart.xlsx");
  }

/*   const getChartData = () => {
    axios.get(endpoint)
      .then(response => setData(response.data))
  } */

  React.useEffect(() => {
    // getChartData()
    setData(mock)
  }, [])

  React.useEffect(() => {
    if (data) {
      const ctx = canvasEl.current.getContext("2d")

      const data = {
        labels: dataSet(mock).labels,
        datasets: dataSet(mock).data
      }

      const config = {
        type: "line",
        data: data
      }

      const myLineChart = new Chart(ctx, config)

      return function cleanup() {
        myLineChart.destroy()
      }
    }
  }, [data])

  return (
    <Container>
      <Grid container>
        <Grid item xs={mobileSize} md={desktopSize} py={6}>
          <Grid container component="main" sx={{ flexDirection: 'unset' }}>
            <CssBaseline />
            {
              heading && (
                <Grid item mb={4}>
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
            <Grid item xs={12} mb={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              {/* <CSVLink
                data={mock.data}
                filename={`line-chart.csv`}
                target="_blank"
                style={{
                  textAlign: 'center',
                  background: '#dc6e19',
                  border: '3px solid #dc6e19',
                  fontFamily: 'Europa',
                  color: '#fff',
                  textDecoration: "none",
                  padding: '0px 10px',
                  borderRadius: '4px'
                }}
              >
                CSV
              </CSVLink> */}
              <div onClick={() => downloadExcel()}>
                <RedirectButton
                  title={'Excel'}
                  // route={route}
                  sx={{ padding: '1px 5px', fontSize: '14px', fontWeight: '300' }}
                />
              </div>

            </Grid>
            <Grid item xs={12} mb={4}>
              <canvas id="myChart" ref={canvasEl} height={chartHeight} />
            </Grid>
            {
              description && (
                <Grid item>
                  <SimpleBlockContent blocks={description} />
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

LineChart.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  desktopSize: PropTypes.number,
  mobileSize: PropTypes.number,
  lineColor: PropTypes.string,
  chartHeight: PropTypes.string,
  // endpoint: PropTypes.string,
}

export default LineChart
