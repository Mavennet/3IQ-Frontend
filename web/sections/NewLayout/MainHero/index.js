import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import { FaTwitter, FaYoutube, FaLinkedin, FaEthereum, FaMixer } from 'react-icons/fa'
import { BsCurrencyBitcoin } from 'react-icons/bs'
import Link from 'next/link'
import Button from '../../../components/NewLayout/Button'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function MainHero(props) {
  const { heading, image, description, button, backgroundImage } = props

  return (
    <Box
      sx={{
        background:
          backgroundImage &&
          `url("${urlFor(backgroundImage)
            .url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: '#082146',
        py: 7
      }}
    >
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item sm={8} xs={12}  >
            <div className={styles.simple__block__content}>
              {description && <SimpleBlockContent blocks={description} />}
            </div>
            <Button
              title="Read our story"
            />
          </Grid>
          <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'block' } }} >
            <div className={styles.social__media}>
              <Link href={'https://twitter.com/3iQ_corp'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaTwitter />
                  </div>
                </a>
              </Link>
              <Link href={'#'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaYoutube />
                  </div>
                </a>
              </Link>
              <Link href={'#'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaLinkedin />
                  </div>
                </a>
              </Link>
            </div>
          </Grid>
        </Grid>
        <div className={styles.box__container}>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <FaEthereum />
              <h5>Navigate</h5>
            </div>
            <p>
              Navigate We help investors navigate and understand the evolving digital asset space
              with investment solutions that provide
            </p>
          </div>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <BsCurrencyBitcoin />
              <h5>Investments</h5>
            </div>
            <p>
              We help investors navigate and understand the evolving digital asset space with investment solutions that provide
            </p>
          </div>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <FaMixer />
              <h5>Quality</h5>
            </div>
            <p>
              We help investors navigate and understand the evolving digital asset space with investment solutions that provide
            </p>
          </div>
        </div>
      </Container>
    </Box>
  )
}

MainHero.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.any,
}

export default MainHero
