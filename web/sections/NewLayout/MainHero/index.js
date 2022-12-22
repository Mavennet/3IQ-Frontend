import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import { FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import Button from '../../../components/NewLayout/Button'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

function MainHero(props) {
  const { heading, image, description, button, backgroundImage } = props

  const typesStyle = {
    solid: styles.button__solid,
    outlined: styles.button__outlined,
  }

  return (
    <Box sx={{ backgroundColor: '#082146', py: 7 }}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item sm={8} xs={10}  >
            <div className={styles.simple__block__content}>
              <h5><strong>That's the 3iQ difference.</strong></h5>
              <h2>innovative investments of institutional Quality</h2>
              <p>We help investors navigate and understand the evolving digital asset space with investment solutions that provide exposure to cryptocurrencies.</p>
            </div>
            <Button
              title="Read our story"
            />
          </Grid>
          <Grid item sm={4} xs={2} >
            <div className={styles.social__media}>
              <Link href={'https://twitter.com/3iQ_corp'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaTwitter/>
                  </div>
                </a>
              </Link>
              <Link href={'#'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaYoutube/>
                  </div>
                </a>
              </Link>
              <Link href={'#'}>
                <a target='_blank' rel="noopener">
                  <div className={styles.icon}>
                    <FaLinkedin/>
                  </div>
                </a>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

MainHero.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.boolean,
  arrow: PropTypes.boolean,
}

export default MainHero
