import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '../../../components/NewLayout/Button'
import styles from './styles.module.scss'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function HeroDoubleButton(props) {
  const {
    name,
    tagName,
    backgroundImage,
    description,
    button,
    secondButton,
    currentLanguage
  } = props

  const localeButton = button[currentLanguage?.languageTag]
  const localeSecondButton = secondButton[currentLanguage?.languageTag]

  return (
    <Box
      sx={{
        background: backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: 'var(--light-orange)',
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box py={10}>
          <div className={styles.text}>
            { name && (<h2>{name}</h2>) }
            { tagName && (<p>{tagName}</p>) }
            { description && (<p>{description}</p>) }
          </div>
          <Box sx={{ display: 'flex', gap: 2 }} mt={4}>
            {localeButton && (localeButton.route || localeButton.link) && (
              <Button
                variant="solid"
                {...localeButton}
                title={localeButton.title}
              />
            )}
            {localeSecondButton && (localeSecondButton.route || localeSecondButton.link) && (
              <Button
                variant="solidOrange"
                {...localeSecondButton}
                title={localeSecondButton.title}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

HeroDoubleButton.propTypes = {
  backgroundImage: PropTypes.object,
  name: PropTypes.object,
  tagName: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  secondButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default HeroDoubleButton
