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
    <div className={styles.container}>
      <div className={styles.left__side}>
        <Box
          py={{ xs: 6, md: 10 }}
          px={{ md: 6 }}
          className={styles.align__header}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--white)',
            justifyContent: 'flex-end',
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
      </div>
      <div className={styles.right__side}>
        <Box
          sx={{
            background:
              backgroundImage &&
              `url("${urlFor(backgroundImage)
                .url()}") no-repeat center center`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  )
}

HeroSubscribe.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.arrayOf(PropTypes.object),
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
}

export default HeroSubscribe
