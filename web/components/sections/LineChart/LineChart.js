import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid, Typography } from '@mui/material'
import RedirectButton from '../../RedirectButton/RedirectButton'
import Chart from "chart.js/auto"
import { CSVLink } from "react-csv"
import * as XLSX from 'xlsx'
import SimpleBlockContent from '../../SimpleBlockContent'
import axios from 'axios'

function LineChart(props) {
  const {
    heading,
    description,
    desktopSize = 12,
    mobileSize = 12,
    chartHeight = '120',
    endpoint
  } = props

  const colors = ["#0082E5", "#dc6e19", "#869D7A", "#FF2205"]

  const [data, setData] = React.useState()

  const canvasEl = React.useRef(null)

  const dataSet = (value) => {
    const dataSet = []
    let count = 0
    if (value) {
      value.map((item) => {
        dataSet.push({
          backgroundColor: 'transparent',
          label: item.label,
          data: item,
          fill: true,
          borderWidth: 2,
          borderColor: colors[count],
          lineTension: 0.2,
          pointBackgroundColor: colors[count],
          pointRadius: 3
        })
        count = count + 1
        return null
      })
    }
    return dataSet
  }

  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "line-chart.xlsx");
  }

  const getChartData = () => {
    axios.get(endpoint)
      .then(response => setData(response.data))
  }

  React.useEffect(() => {
    getChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (data) {
      const ctx = canvasEl.current.getContext("2d")

      const dataChart = {
        datasets: dataSet(data)
      }

      const config = {
        type: "line",
        data: dataChart
      }

      const myLineChart = new Chart(ctx, config)

      return function cleanup() {
        myLineChart.destroy()
      }
    }
  }, [data])

  return (
    <Grid item xs={mobileSize} md={desktopSize} py={6} sx={{fontFamily: 'Europa'}}>
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
        {
          data && (
            <Grid item xs={12} mb={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
                  textDecoration: "none",
                  padding: '0px 10px',
                  borderRadius: '4px'
                }}
              >
                CSV
              </CSVLink>
              <div onClick={() => downloadExcel()}>
                <RedirectButton
                  title={'Excel'}
                  // route={route}
                  sx={{ padding: '1px 5px', fontSize: '14px', fontWeight: '300' }}
                />
              </div>
            </Grid>
          )
        }
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
  )
}

LineChart.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  desktopSize: PropTypes.number,
  mobileSize: PropTypes.number,
  chartHeight: PropTypes.string,
  endpoint: PropTypes.string,
}

export default LineChart
