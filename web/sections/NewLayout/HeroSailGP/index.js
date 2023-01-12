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

function HeroSailGP(props) {
  const { heading, backgroundImage, description, button, currentLanguage } = props

  const localeButton = button[currentLanguage?.languageTag]

  return (
    <Box
      sx={{
        backgroundColor: '#0D1C3D',
        pt: 15,
        pb: 2,
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box
          sx={{
            position: 'relative',
            background:
              backgroundImage &&
              `url("${urlFor(backgroundImage)
                .url()}") no-repeat center center`,
            backgroundSize: 'cover',
            px: 5,
            mx: 2,
            minHeight: { xs: '250px', sm: '400px', md: 'auto', },
            mt: { xs: 5, md: 0 }
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6} my={4}>
              <h2 className={styles.heading}>{heading}</h2>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <div className={styles.simple__block__content}>
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' }, display: { xs: 'block', md: 'none' } }}>
        <Grid container>
          <Grid item xs={12} md={6} mx={2}>
            <div className={styles.simple__block__content}>
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
      <Box mt={8}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </Box>
    </Box>
  )
}

HeroSailGP.propTypes = {
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroSailGP
