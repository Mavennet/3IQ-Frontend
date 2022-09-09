import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
// import styles from './Timeline.module.css'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import {Timeline as MuiTimeline} from '@mui/lab'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

const timeLineDotSx = {border: '4px solid #DC6E19', background: '#DC6E19', margin: 0}

function renderTimeline() {
  return (
    <MuiTimeline position="right">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={timeLineDotSx} variant="outlined" />
          <TimelineConnector sx={{border: '2px solid #DC6E19'}} />
        </TimelineSeparator>
        <TimelineContent sx={{paddingRight: '10px'}}></TimelineContent>
      </TimelineItem>
      {ITEMS.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{color: '#0182e5', fontWeight: 'bold'}}>
            {item.year}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                ...timeLineDotSx,
                background: 'white',
                width: '45px',
                height: '45px',
              }}
              variant="outlined"
            />
            <TimelineConnector sx={{border: '2px solid #DC6E19', paddingTop: '200px'}} />
          </TimelineSeparator>
          <TimelineContent sx={{paddingRight: '10px'}}>{item.text}</TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={timeLineDotSx} variant="outlined" />
        </TimelineSeparator>
        <TimelineContent sx={{paddingRight: '10px'}}></TimelineContent>
      </TimelineItem>
    </MuiTimeline>
  )
}

function Timeline(props) {
  const {backgroundImage, leftFirstTextBlock, leftSecondTextBlock, items} = props

  console.log(leftFirstTextBlock)
  console.log(leftSecondTextBlock)
  console.log(items)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          pt: 2,
          pb: 2,
        }}
      >
        <Container maxWidth="md">
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box pt={15} pr={{md: 30, xs: 0}}>
                <Typography variant="h5" style={{color: 'white', fontWeight: 'bold'}}>
                  Since 2012, 3iQ has continued to forge ahead with many “firsts” in digital asset
                  investing…
                </Typography>
                <Typography variant="h5" pt={40} style={{color: 'white', fontWeight: 'bold'}}>
                  … and now, 3iQ manages over $700M in AUM* (assets under management)
                </Typography>
                <span>*CAD as at June 30, 2022</span>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box style={{color: 'white'}}>{renderTimeline()}</Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

const ITEMS = [
  {year: '2012', text: '3iQ is founded by investment industry veteran Fred Pye'},
  {
    year: '2017',
    text: '3iQ becomes first regulated Digital Asset Investment Fund Manager in Canada',
  },
  {
    year: '2018',
    text: '3iQ launches one of the industry’s first diversified portfolio of multiple crypto assets in a fund',
  },
  {
    year: '2020',
    text: '3iQ launches North America’s first major-exchange listed Bitcoin and Ether Funds',
  },
  {
    year: '2021',
    text: '3iQ launches one of the world’s first Bitcoin and Ether ETFs in collaboration with CoinShares',
  },
  {
    year: 'June 2022',
    text: '3iQ launches the Middle East’s first exchange listed fund with bitcoin as underlying asset on Nasdaq Dubai',
  },
  {
    year: 'December',
    text: 'Launch of 3iQ Digital Assets (US) with separately managed account and model portfolio solutions available',
  },
]

Timeline.propTypes = {
  backgroundImage: PropTypes.object,
  leftFirstTextBlock: PropTypes.object,
  leftSecondTextBlock: PropTypes.object,
  items: PropTypes.array,
}

export default Timeline
