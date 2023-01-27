import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const builder = imageUrlBuilder(client)

function Hero(props) {
  const {
    heading,
    description,
    backgroundImage,
    backgroundColor,
    fontColor,
    sideImage,
    bottomImage,
  } = props

  return sideImage && bottomImage ? (
    <Box
      sx={{
        bgcolor: backgroundColor ? backgroundColor : '#091b3f',
      }}
    >
      <Container sx={{maxWidth: {sm: 'sm', lg: 'lg'}, p: 0}}>
        <Grid container>
          <Grid item sm={1} sx={{display: {xs: 'none', sm: 'flex'}}}>
            <Box
              component="img"
              sx={{maxHeight: '400px'}}
              alt={sideImage.alt}
              src={builder.image(sideImage).url()}
            />
          </Grid>
          <Grid
            item
            sm={11}
            xs={12}
            sx={{pt: {lg: 4, xs: 6}, pb: {lg: 8, xs: 2}, pl: {lg: 5, sm: 10}, p: 2}}
          >
            <Box sx={{p: '5 1', pr: 1, pl: {xs: 1}}}>
              <Box
                sx={{
                  pt: 5,
                  pr: {sm: 0, lg: 70},
                  color: `${fontColor ? fontColor : '#fff'}`,
                  align: 'left',
                }}
              >
                <h1 className={styles.heading}>{heading}</h1>
                <div className={styles.simpleBlockContent}>
                  {description && <SimpleBlockContent blocks={description} />}
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{pb: 4, display: {xs: 'block', sm: 'none'}}}>
            <Box
              sx={{
                height: '120px',
                background:
                  bottomImage && `url("${urlFor(bottomImage).url()}") no-repeat center center`,
                backgroundSize: 'contain',
                bgcolor: backgroundColor ? backgroundColor : '#091b3f',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  ) : (
    <Box
      sx={{
        background:
          backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: backgroundColor ? backgroundColor : '#091b3f',
        pt: {lg: 12, xs: 8},
        pb: {lg: 18, xs: 14},
      }}
    >
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Box sx={{p: '5 1', pr: 1, pl: {xs: 1}}}>
          <Box
            sx={{
              pt: 5,
              pr: {md: 30, sm: 10},
              color: `${fontColor ? fontColor : '#fff'}`,
              align: 'left',
            }}
          >
            <h1 className={styles.heading}>{heading}</h1>
            <div className={styles.simpleBlockContent}>
              {description && <SimpleBlockContent blocks={description} />}
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  description: PropTypes.any,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  bottomImage: PropTypes.object,
  sideImage: PropTypes.object,
}

export default Hero
