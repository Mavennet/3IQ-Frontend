import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import { FaTwitter, FaYoutube, FaLinkedin, FaEthereum, FaMixer } from 'react-icons/fa'
import { BsCurrencyBitcoin } from 'react-icons/bs'
import Link from 'next/link'
import Button from '../../../components/NewLayout/Button'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Rotating3DLogo from '../Rotating3DLogo'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function MainHero(props) {
  const {
    description,
    button,
    backgroundImage,
    currentLanguage,
    twitterUrl,
    linkedinUrl,
    youtubeUrl,
    firstBoxTitle,
    firstBoxDescription,
    firstRoute,
    secondBoxTitle,
    secondBoxDescription,
    secondRoute,
    thirdBoxTitle,
    thirdBoxDescription,
    thirdRoute,
  } = props

  const localeButton = button[currentLanguage?.languageTag]

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        background:
          mobile &&
          backgroundImage &&
          `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: '#082146',
        py: 7,
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg', xl: 'xl' } }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item sm={8} md={5} xs={12}>
            <div className={styles.simple__block__content}>
              {description && <SimpleBlockContent blocks={description} />}
            </div>
            {localeButton && (localeButton.route || localeButton.link) && (
              <Button {...localeButton} title={localeButton.title} />
            )}
          </Grid>
          <Grid item sm={false} md={6} alignSelf="stretch">
            <Box position="relative">
              <Rotating3DLogo />
            </Box>
          </Grid>
          <Grid item sm={4} md={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div className={styles.social__media}>
              {twitterUrl && (
                <Link href={twitterUrl}>
                  <a target="_blank" rel="noopener">
                    <div className={styles.icon}>
                      <FaTwitter />
                    </div>
                  </a>
                </Link>
              )}
              {youtubeUrl && (
                <Link href={youtubeUrl}>
                  <a target="_blank" rel="noopener">
                    <div className={styles.icon}>
                      <FaYoutube />
                    </div>
                  </a>
                </Link>
              )}
              {linkedinUrl && (
                <Link href={linkedinUrl}>
                  <a target="_blank" rel="noopener">
                    <div className={styles.icon}>
                      <FaLinkedin />
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </Grid>
        </Grid>
        <div className={styles.box__container}>
          <Link
            href={{
              pathname: `/${firstRoute[currentLanguage?.languageTag]?.title}`,
              query: { slug: firstRoute[currentLanguage?.languageTag]?.route?.slug?.current },
            }}
            as={`/${firstRoute[currentLanguage?.languageTag]?.route?.slug?.current}`}
          >
            <a>
              <div className={styles.box__main__hero}>
                <div className={styles.box__title}>
                  <FaEthereum />
                  {firstBoxTitle && <h5>{firstBoxTitle}</h5>}
                </div>
                {firstBoxDescription && <p>{firstBoxDescription}</p>}
              </div>
            </a>
          </Link>
          <Link
            href={{
              pathname: `/${secondRoute[currentLanguage?.languageTag]?.title}`,
              query: { slug: secondRoute[currentLanguage?.languageTag]?.route?.slug?.current },
            }}
            as={`/${secondRoute[currentLanguage?.languageTag]?.route?.slug?.current}`}
          >
            <a>
              <div className={`${styles.box__main__hero} ${styles.blue}`}>
                <div className={styles.box__title}>
                  <BsCurrencyBitcoin />
                  {secondBoxTitle && <h5>{secondBoxTitle}</h5>}
                </div>
                {secondBoxDescription && <p>{secondBoxDescription}</p>}
              </div>
            </a>
          </Link>
          <Link
            href={{
              pathname: `/${thirdRoute[currentLanguage?.languageTag]?.title}`,
              query: { slug: thirdRoute[currentLanguage?.languageTag]?.route?.slug?.current },
            }}
            as={`/${thirdRoute[currentLanguage?.languageTag]?.route?.slug?.current}`}
          >
            <a>
              <div className={styles.box__main__hero}>
                <div className={styles.box__title}>
                  <FaMixer />
                  {thirdBoxTitle && <h5>{thirdBoxTitle}</h5>}
                </div>
                {thirdBoxDescription && <p>{thirdBoxDescription}</p>}
              </div>
            </a>
          </Link>
        </div>
      </Container >
    </Box >
  )
}

MainHero.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.any,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  twitterUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  youtubeUrl: PropTypes.string,
  firstBoxTitle: PropTypes.string,
  firstBoxDescription: PropTypes.string,
  firstRoute: PropTypes.object,
  secondBoxTitle: PropTypes.string,
  secondBoxDescription: PropTypes.string,
  secondRoute: PropTypes.object,
  thirdBoxTitle: PropTypes.string,
  thirdBoxDescription: PropTypes.string,
  thirdRoute: PropTypes.object,
}

export default MainHero
