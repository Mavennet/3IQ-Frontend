import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Card, CardContent, CardMedia, Container, Grid, Box} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
const builder = imageUrlBuilder(client)

function KeyBenefits(props) {
  const {title, benefits, currentLanguage, fundsLayout} = props

  return fundsLayout ? (
    <Container maxWidth="lg">
      <h3>{title}</h3>
      <Grid container mt={5} mb={5}>
        {benefits.map((benefit, index) => (
          <Grid item md={6} xs={12} my={2} container>
            <Grid item xs={3} pr={{md: 8, xs: 3}}>
              <Box sx={{background: benefit.cardColor || '#F59B1E', textAlign: 'center'}}>
                <Box
                  component="img"
                  src={builder.image(benefit.mainImage).url()}
                  sx={{
                    filter: 'brightness(0) invert(1)',
                    maxHeight: {md: '40px', xs: '35px'},
                    pt: 2,
                    pb: 1.5,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={9} mt={3}>
              <h5 className={styles.text__fundLayout__heading}>
                {benefit.heading[currentLanguage?.languageTag]}
              </h5>
              <span className={styles.text__fundLayout__body}>
                {(benefit.text && benefit.text[currentLanguage?.languageTag]) || ''}
              </span>
              <Box className={styles.text__fundLayout__body} pt={2} pr={{md: 30, xs: 2}}>
                <SimpleBlockContent blocks={benefit.body[currentLanguage?.languageTag]} />
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <Container maxWidth="lg">
      <h3>{title}</h3>
      <Grid container mt={5} mb={5}>
        {benefits.map((benefit, index) => (
          <Grid item md={12 / benefits.length} sm={12}>
            <Box
              sx={{p: 3, background: index % 2 == 0 ? '#0082E5' : '#1495F8'}}
              className={styles.text}
            >
              <Grid container>
                <Grid item md={2} xs={1}>
                  <Box
                    component="img"
                    src={builder.image(benefit.mainImage).url()}
                    sx={{
                      filter: 'brightness(0) invert(1)',
                      // justifyContent: 'center',
                      p: 0.5,
                    }}
                  />
                </Grid>
                <Grid item md={10} xs={11} pl={3}>
                  <h5 className={styles.text__heading}>
                    {benefit.heading[currentLanguage?.languageTag]}
                  </h5>
                </Grid>
              </Grid>

              <p className={styles.text__body}>
                {(benefit.text && benefit.text[currentLanguage?.languageTag]) || ''}
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

KeyBenefits.propTypes = {
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.object,
      heading: PropTypes.object,
    })
  ),
  title: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default KeyBenefits
