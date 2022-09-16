import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './Timeline.module.css'
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

function renderTimeline(items, langTag) {
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
            {item.localeDateText[langTag]}
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
            <TimelineConnector sx={{border: '2px solid #DC6E19', paddingTop: '90px'}} />
          </TimelineSeparator>
          <TimelineContent sx={{paddingRight: '10px'}}>
            <Typography
              sx={{display: {md: 'none', xs: 'block'}, color: '#0182e5', fontWeight: 'bold'}}
            >
              {item.localeDateText[langTag]}
            </Typography>
            <div className={styles.simpleBlockContent}>
            <SimpleBlockContent blocks={item.localeDescriptionText[langTag]} />
            </div>
            
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
  const {backgroundImage, leftFirstTextBlock, leftSecondTextBlock, currentLanguage, span, items} = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat`,
          backgroundPosition: {xs: '50vw -6vw', md: '2vw -6vw', lg: '10vw -6vw'},
          backgroundSize: {xs: 'auto', md: '100%'},
          backgroundRepeat: 'repeat-y',
          bgcolor: '#091b3f',
          pt: 2,
          pb: {xs: 10, md: 0},
        }}
      >        
        <Container sx={{ maxWidth: {sm: 'md', lg: 'lg'} }}>
          <Grid container>
            <Grid style={{color: 'white', fontWeight: 'bold'}} item md={5} xs={12}>
              <Box className={styles.leftSimbleBlockContent} pt={{lg: 8, md: 8, xs: 0}} pr={{md: 20, xs: 0}}>
                {leftFirstTextBlock && <SimpleBlockContent blocks={leftFirstTextBlock} />}
              </Box>
              <Box className={styles.leftSimbleBlockContent} pt={{lg: 26, md: 8, xs: 12}} pr={{md: 20, xs: 0}} mb={{md: 0, xs: -6}}>
                {leftSecondTextBlock && <SimpleBlockContent blocks={leftSecondTextBlock} />}
              </Box>
              {span && (<span className={styles.span}>{span}</span>)}
              
            </Grid>
            <Grid item md={7} xs={12} pt={{md: 0, xs: 10}}>
              <Box style={{color: 'white'}}>
                {items && renderTimeline(items, currentLanguage.languageTag)}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

Timeline.propTypes = {
  backgroundImage: PropTypes.object,
  leftFirstTextBlock: PropTypes.object,
  leftSecondTextBlock: PropTypes.object,
  currentLanguage: PropTypes.object,
  items: PropTypes.array,
  span: PropTypes.string,
}

export default Timeline
