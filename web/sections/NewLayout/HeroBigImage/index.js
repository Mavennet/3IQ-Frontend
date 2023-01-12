import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Box, Grid, Typography } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { BsArrowDown } from 'react-icons/bs'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const builder = imageUrlBuilder(client)

function HeroBigImage(props) {

  const {
    heading,
    description,
    backgroundImage,
    backgroundColor,
    fontColor,
  } = props

  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'flex' },
        alignItems: 'center',
        padding: { xs: '0px', md: '100px 0px' },
        background: backgroundColor ? backgroundColor : '#091b3f',
      }}
    >
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          component="img"
          sx={{
            width: '100%',
          }}
          alt={backgroundImage.alt}
          src={builder.image(backgroundImage).url()}
        />
        <Container sx={{ maxWidth: { sm: 'xs', lg: 'lg' }, color: fontColor ? fontColor : 'var(--black)' }}>
          <Grid container py={8}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                mb={2}
                sx={{
                  fontWeight: '300',
                  color: fontColor ? fontColor : 'var(--black)',
                  fontSize: 'var(--font-size-primary-lg)',
                  fontFamily: 'var(--font-family-primary)'
                }}
              >
                {heading}
              </Typography>
              <div className={styles.simple__block__content__mobile}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
              <Box mt={4}>
                <BsArrowDown size={60} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container sx={{ maxWidth: { sm: 'xs', lg: 'lg' }, p: 0, display: { xs: 'none', md: 'flex' } }}>
        <Grid container>
          <Grid item md={8} sx={{ position: 'relative', color: fontColor ? fontColor : 'var(--black)' }}>
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                position: 'relative'
              }}
              alt={backgroundImage.alt}
              src={builder.image(backgroundImage).url()}
            />
            <div className={styles.heading}>
              <Typography
                variant="h2"
                mb={2}
                sx={{
                  fontWeight: '300',
                  color: fontColor ? fontColor : 'var(--black)',
                  fontSize: { sm: 'var(--font-size-primary-lg)', lg: 'var(--font-size-primary-xl)' },
                  fontFamily: 'var(--font-family-primary)'
                }}
              >
                {heading}
              </Typography>
              <div className={styles.simple__block__content}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

HeroBigImage.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  description: PropTypes.any,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default HeroBigImage
