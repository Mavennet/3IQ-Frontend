import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid, Typography } from '@mui/material'
import RedirectButton from '../../RedirectButton/RedirectButton'
import Chart from "chart.js/auto"
import mock from './mock.json'
import { CSVLink } from "react-csv"
import * as XLSX from 'xlsx';

function LineChart(props) {
  const {
    heading = 'Historical MVIS CryptoCompare Bitcoin Benchmark Rate Index',
    description = '^The Fund’s bitcoin is valued based on the MVIS CryptoCompare Bitcoin Benchmark Rate Index (BBR) maintained by MV Index Solutions GmbH (MVIS). The index is disseminated in USD and the closing value is calculated at 16:00 ET with fixed 16:00 ET exchange rates.',
    gridSize = { xs: 12, md: 12 },
    lineColor = "#0082E5",
    chartHeight = '120'
  } = props

  const canvasEl = React.useRef(null)

  const labels = (mock) => {
    const labels = []
    mock.map((item) => {
      return labels.push(item.date)
    })
    return (labels)
  }

  const dataChart = (mock) => {
    const data = []
    mock.map((item) => {
      return data.push(item.value)
    })
    return (data)
  }

  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(mock.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  }

  React.useEffect(() => {
    const ctx = canvasEl.current.getContext("2d")

    const data = {
      labels: labels(mock.data),
      datasets: [
        {
          backgroundColor: 'transparent',
          label: mock.label,
          data: dataChart(mock.data),
          fill: true,
          borderWidth: 2,
          borderColor: lineColor,
          lineTension: 0.2,
          pointBackgroundColor: lineColor,
          pointRadius: 3
        }
      ]
    }

    const config = {
      type: "line",
      data: data
    }

    const myLineChart = new Chart(ctx, config)

    return function cleanup() {
      myLineChart.destroy()
    }
  })

  return (
    <Grid item xs={gridSize.xs} md={gridSize.md} py={6}>
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
          <CSVLink
            data={mock.data}
            filename={`line-chart.csv`}
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-164s4cv-MuiButtonBase-root-MuiButton-root"
            target="_blank"
            style={{ textAlign: 'center' }}
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
        <Grid item xs={12} mb={4}>
          <canvas id="myChart" ref={canvasEl} height={chartHeight} />
        </Grid>
        {
          description && (
            <Grid item>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontFamily: 'Europa',
                  color: '#091B3F'
                }}
              >{description}</Typography>
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
  gridSize: PropTypes.object,
  lineColor: PropTypes.string,
  chartHeight: PropTypes.string,
}

export default LineChart
