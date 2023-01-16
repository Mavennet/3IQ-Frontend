import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Box, Container, Grid } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import Button from '../../../components/NewLayout/Button'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroFirstVariation(props) {
  const {
    heading,
    firstButton,
    secondButton,
    backgroundImage,
    currentLanguage,
  } = props

  const localeFirstButton = firstButton?.[currentLanguage?.languageTag]
  const localeSecondButton = secondButton?.[currentLanguage?.languageTag]

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
      <Grid container my={6}>
        <Grid item xs={12}>
          <Box
            sx={{
              background:
                backgroundImage ?
                `url("${urlFor(backgroundImage)
                  .url()}") no-repeat center center` : 'var(--light-blue)',
              backgroundSize: 'cover',
              p: 7
            }}
          >
            <Grid container>
              <Grid item xs={12} md={7}>
                <div className={styles.simple__block__content}>
                  {heading && <SimpleBlockContent blocks={heading} />}
                </div>
                <div className={styles.container__buttons}>
                  {localeFirstButton && (localeFirstButton.route || localeFirstButton.link) && (
                    <Button
                      variant="solidWhite"
                      {...localeFirstButton}
                      title={localeFirstButton.title}
                    />
                  )}
                  {localeSecondButton && (localeSecondButton.route || localeSecondButton.link) && (
                    <Button
                      variant="outlinedWhite"
                      {...localeSecondButton}
                      title={localeSecondButton.title}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

HeroFirstVariation.propTypes = {
  heading: PropTypes.any,
  firstButton: PropTypes.object,
  secondButton: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
}

export default HeroFirstVariation
