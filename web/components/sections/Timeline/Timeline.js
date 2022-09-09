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
import SimpleBlockContent from '../../SimpleBlockContent'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

const timeLineDotSx = {border: '4px solid #DC6E19', background: '#DC6E19', margin: 0}

function renderTimeline(items) {
  return (
    <MuiTimeline position="right">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{display: {xs: 'none', md: 'block'}, color: '#0182e5', fontWeight: 'bold'}}
        ></TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{...timeLineDotSx, margin: 2, marginBottom: 0}} variant="outlined" />
          <TimelineConnector sx={{border: '2px solid #DC6E19'}} />
        </TimelineSeparator>
        <TimelineContent sx={{paddingRight: '10px'}}></TimelineContent>
      </TimelineItem>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{display: {xs: 'none', md: 'block'}, color: '#0182e5', fontWeight: 'bold'}}
          >
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
          <TimelineContent sx={{paddingRight: '10px'}}>
            <Typography
              sx={{display: {md: 'none', xs: 'block'}, color: '#0182e5', fontWeight: 'bold'}}
            >
              {item.year}
            </Typography>
            <Typography> {item.text}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{display: {xs: 'none', md: 'block'}, color: '#0182e5', fontWeight: 'bold'}}
        ></TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{...timeLineDotSx, margin: 2, marginTop: 0}} variant="outlined" />
        </TimelineSeparator>
        <TimelineContent sx={{paddingRight: '10px'}}></TimelineContent>
      </TimelineItem>
    </MuiTimeline>
  )
}

function Timeline(props) {
  console.log(props)
  const {backgroundImage, leftFirstTextBlock, leftSecondTextBlock, items} = props

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
            <Grid style={{color: 'white', fontWeight: 'bold'}} item md={6} xs={12}>
              <Box pt={15} pr={{md: 30, xs: 0}}>
                {leftFirstTextBlock && <SimpleBlockContent blocks={leftFirstTextBlock} />}
              </Box>
              <Box pt={60} pr={{md: 30, xs: 0}}>
                {leftSecondTextBlock && <SimpleBlockContent blocks={leftSecondTextBlock} />}
              </Box>
              <span>*CAD as at June 30, 2022</span>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box style={{color: 'white'}}>{items && renderTimeline(items)}</Box>
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
