import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './styles.module.scss'
import client from '../../../client'
import { Container, Typography, Box, Grid } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import Button from '../../../components/NewLayout/Button'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroWithImage(props) {
  const { heading, backgroundImage, description, button, currentLanguage, align, stripes } = props

  const localeButton = button[currentLanguage?.languageTag]

  return (
    <Box
      sx={{
        background:
          backgroundImage &&
          `url("${urlFor(backgroundImage)
            .url()}") no-repeat center center`,
        backgroundSize: 'cover',
        py: 15,
        position: 'relative',
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container sx={{ display: 'flex', justifyContent: align ? align : 'flex-end' }}>
          <Grid item xs={12} md={6} my={4}>
            <div className={styles.simple__block__content}>
              <h2 className={styles.heading}>{heading}</h2>
              {description && <SimpleBlockContent blocks={description} />}
            </div>
            {localeButton && (localeButton.route || localeButton.link) &&
              (
                <Button
                  variant={'solidOrange'}
                  className={styles.button}
                  {...localeButton}
                ></Button>
              )}
          </Grid>
        </Grid>
      </Container>
      {
        stripes && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
            }}
          >
            <div className={styles.stripe} />
            <div className={styles.stripe} />
            <div className={styles.stripe} />
          </Box>
        )
      }
    </Box>
  )
}

HeroWithImage.propTypes = {
  heading: PropTypes.object,
  align: PropTypes.string,
  stripes: PropTypes.bool,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroWithImage
