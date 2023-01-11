import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Timeline as MuiTimeline } from '@mui/lab'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

const timeLineDotSx = {
  backgroundColor: 'var(--light-blue)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--white)',
  margin: 0,
  width: '78px',
  height: '78px',
  border: 0
}

function Timeline(props) {
  const {
    name,
    leftFirstTextBlock,
    leftSecondTextBlock,
    currentLanguage,
    span,
    firstDateContent,
    secondDateContent,
    thirdDateContent,
    fourthDateContent,
    fifthDateContent,
    sixthDateContent
  } = props

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
      <Grid container py={7}>
        <Grid item xs={12}>
          <h2 className={styles.title}>{name}</h2>
        </Grid>
        <Grid item xs={12} mb={4}>
          <div className={styles.subtitle}>
            {leftFirstTextBlock && <SimpleBlockContent blocks={leftFirstTextBlock} />}
          </div>
        </Grid>
        <Grid item xs={0} md={12} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 10 }}>
          <Box mt={20}>
            <div className={`${styles.line} ${styles.half__height}`}>
              {
                secondDateContent && (
                  <div className={`${styles.text} ${styles.top} ${styles.left}`}>
                    <SimpleBlockContent blocks={secondDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
              <div className={`${styles.circle} ${styles.top}`}>2017</div>
              <div className={`${styles.circle} ${styles.bottom}`}>2020</div>
              {
                fourthDateContent && (
                  <div className={`${styles.text} ${styles.bottom} ${styles.left}`}>
                    <SimpleBlockContent blocks={fourthDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
            </div>
          </Box>
          <Box>
            <div className={styles.line}>
              {
                firstDateContent && (
                  <div className={`${styles.text} ${styles.top} ${styles.right}`}>
                    <SimpleBlockContent blocks={firstDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
              <div className={`${styles.circle} ${styles.top}`}>2012</div>
              <div className={`${styles.circle} ${styles.bottom}`}>2022</div>
              {
                sixthDateContent && (
                  <div className={`${styles.text} ${styles.bottom} ${styles.left}`}>
                    <SimpleBlockContent blocks={sixthDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
            </div>
          </Box>
          <Box mt={40}>
            <div className={`${styles.line} ${styles.half__height}`}>
              {
                thirdDateContent && (
                  <div className={`${styles.text} ${styles.top} ${styles.right}`}>
                    <SimpleBlockContent blocks={thirdDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
              <div className={`${styles.circle} ${styles.top}`}>2018</div>
              <div className={`${styles.circle} ${styles.bottom}`}>2021</div>
              {
                fifthDateContent && (
                  <div className={`${styles.text} ${styles.bottom} ${styles.right}`}>
                    <SimpleBlockContent blocks={fifthDateContent[currentLanguage.languageTag]} />
                  </div>
                )
              }
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: { md: 'none' } }}>
          <Box>
            <MuiTimeline
              position="right"
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {
                firstDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2012
                      </TimelineDot>
                      <TimelineConnector sx={{ border: '2px solid var(--dark-gray)', paddingTop: '90px' }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={firstDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
              {
                secondDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2017
                      </TimelineDot>
                      <TimelineConnector sx={{ border: '2px solid var(--dark-gray)', paddingTop: '90px' }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={secondDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
              {
                thirdDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2018
                      </TimelineDot>
                      <TimelineConnector sx={{ border: '2px solid var(--dark-gray)', paddingTop: '90px' }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={thirdDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
              {
                fourthDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2020
                      </TimelineDot>
                      <TimelineConnector sx={{ border: '2px solid var(--dark-gray)', paddingTop: '90px' }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={fourthDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
              {
                fifthDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2021
                      </TimelineDot>
                      <TimelineConnector sx={{ border: '2px solid var(--dark-gray)', paddingTop: '300px' }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={fifthDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
              {
                sixthDateContent && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot sx={{ ...timeLineDotSx, }} variant="outlined">
                        2022
                      </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className={styles.simpleBlockContent}>
                        <SimpleBlockContent blocks={sixthDateContent[currentLanguage.languageTag]} />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )
              }
            </MuiTimeline>
          </Box>
        </Grid>
        <Grid item xs={12} mt={4}>
          <div className={styles.subtitle}>
            {leftSecondTextBlock && <SimpleBlockContent blocks={leftSecondTextBlock} />}
            {span && (<h5 className={styles.span}>{span}</h5>)}
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

Timeline.propTypes = {
  name: PropTypes.string,
  leftFirstTextBlock: PropTypes.object,
  leftSecondTextBlock: PropTypes.object,
  firstDateContent: PropTypes.object,
  secondDateContent: PropTypes.object,
  thirdDateContent: PropTypes.object,
  fourthDateContent: PropTypes.object,
  fifthDateContent: PropTypes.object,
  sixthDateContent: PropTypes.object,
  currentLanguage: PropTypes.object,
  span: PropTypes.string,
}

export default Timeline
