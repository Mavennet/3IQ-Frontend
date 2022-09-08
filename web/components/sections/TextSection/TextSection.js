import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TextSection.module.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'
import CardMedia from '@mui/material/CardMedia'

function TextSection(props) {
  const {text, videoSrc, button} = props

  console.log(videoSrc)

  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{p: 5, pr: 1, pt: 0, pl: {xs: 1}}}>
          <Grid container>
            <Grid item sm={videoSrc ? 8 : 12} xs={12}>
              <Box sx={{pt: 5, pr: videoSrc && {md: 20, sm: 0}, align: 'left'}}>
                <div className={styles.textSection}>
                  {text && <SimpleBlockContent blocks={text} />}
                </div>
                {button && (
                  <RedirectButton {...button} sx={{width: {xs: '100%', md: 250}, mt: 5}} />
                )}
              </Box>
            </Grid>
            {videoSrc && (
              <Grid item md={4} sm={12}>
                <Box
                  sx={{
                    position: {md: 'absolute', xs: 'relative'},
                    width: {xl: '20%', lg: '30%'},
                    top: {md: '300px'},
                    mt: {md: 0, xs: 5},
                  }}
                >
                  <video
                    className={styles.video}
                    // height={500}
                    src={videoSrc}
                    autoplay=""
                    loop=""
                    controls=""
                    muted="muted"
                    playsinline=""
                    controlslist="nodownload"
                  ></video>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

TextSection.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
}

export default TextSection
