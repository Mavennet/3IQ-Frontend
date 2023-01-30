import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import ButtonTextArea from '../../../components/NewLayout/ButtonTextArea'

function HeroSubscribe(props) {
  const {
    heading,
    description,
    backgroundImage,
    currentLanguage,
  } = props

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  return (
    <Grid
      container
      component="main"
    >
      <Grid item xs={12} md={6} sx={{ background: '#EBEBEB', position: 'relative' }} square>
        <Box
          py={{ xs: 6, md: 10 }}
          className={styles.align__header}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            backgroundColor: '#0D1C3D'
          }}>
          <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
            <Grid container>
              <Grid item xs={12}>
                <h1 className={styles.heading}>{heading}</h1>
                <div className={styles.simpleBlockContent}>
                  {description && <SimpleBlockContent blocks={description} />}
                </div>
                <ButtonTextArea
                  placeholder={'Ex: john@email.com'}
                  buttonTitle={'Subscribe'}
                  className={styles.button__text__area}
                  size={'lg'}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

      </Grid>
      <Grid
        item
        xs={12}
        py={{ xs: 28, md: 0 }}
        md={6}
        sx={{
          background:
            backgroundImage &&
            `url("${urlFor(backgroundImage)
              .url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-end', md: 'center' },
          alignItems: 'center',
        }}
      >
      </Grid>
    </Grid>
  )
}

HeroSubscribe.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.arrayOf(PropTypes.object),
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
}

export default HeroSubscribe
