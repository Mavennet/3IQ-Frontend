import React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { RiDoubleQuotesL } from 'react-icons/ri'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import Image from 'next/image'
import Button from '../../../components/NewLayout/Button'

function QuoteFounder({ name, quotesText, profilePhoto, localeJobTitle, button, currentLanguage }) {

  console.log(button)

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  return (
    <Box sx={{background: '#ECECEC'}} py={10}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container spacing={{ xs: 0, md: 2 }}>
          <Grid item xs={12} sm={6} md={8} mb={4}>
            <RiDoubleQuotesL
              size={50}
              color={'#009A93'}
            />
            {
              quotesText && (
                <div className={styles.simple__block__content}>
                  <SimpleBlockContent blocks={quotesText} />
                </div>
              )
            }
            <Typography
              variant="h3"
              my={1}
              sx={{
                fontFamily: 'var(--font-family-secondary)',
                color: 'var(--black)',
                fontSize: 'var(--font-size-secondary-md)',
                fontWeight: 'var(--font-weight-regular)',
              }}
            >
              <strong>{name}</strong>
            </Typography>
            <Typography
              variant="h4"
              mb={6}
              sx={{
                fontFamily: 'var(--font-family-secondary)',
                color: '#404040',
                fontSize: 'var(--font-size-secondary-sm)',
                fontWeight: 'var(--font-weight-regular)',
              }}
            >
              {localeJobTitle && localeJobTitle}
            </Typography>
            {button && (
              <Button
                {...button[currentLanguage.languageTag]}
                title={button[currentLanguage.languageTag].title}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={styles.imgGrid}>
              {
                profilePhoto.asset._ref && (
                  <Image
                    src={urlFor(profilePhoto.asset._ref).url()}
                    alt={name}
                    layout='fill'
                    objectFit='cover'
                  />
                )
              }
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

QuoteFounder.propTypes = {
  currentLanguage: PropTypes.object,
}

export default QuoteFounder
