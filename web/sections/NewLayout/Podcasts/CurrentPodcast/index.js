import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import {MdPauseCircle} from 'react-icons/md'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const builder = imageUrlBuilder(client)

function CurrentPodcast(props) {
  const {heading} = props

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box pt={10} pb={5}>
            <span className={styles.podcast__categorie}> Research & Education</span>
            <h3>Podcasts</h3>
            <Box py={5}>
              <div className={styles.stripe} />
              <div className={styles.stripe} />
              <div className={styles.stripe} />
            </Box>
            <Box pr={10}>
              <span className={styles.podcast__author}>Podcast by Andrew Lincoln</span>
              <h4 className={styles.podcast__title}>
                Exploring the Custodia Bank Project with Caitlin Long and Angie Dalton
              </h4>
              <p className={styles.podcast__description}>
                Particular take on the possibilities of crypto technologies in the current climate.
                Caitlin’s approach is one we do not hear about so often, and we get to explore how
                Custodia Bank is hoping to harness the powers of new technology.
              </p>
              <Box className={styles.podcast__player} pt={3}>
                <Box pt={1}>
                  <MdPauseCircle style={{color: '#0082E5', fontSize: '40px'}} />
                </Box>
                <Box>
                  <span className={styles.podcast__date}>May 25, 2022</span>
                </Box>
                <Box>
                  <span className={styles.podcast__duration}>22 min left</span>
                </Box>
                <Box className={styles.podcast__bar} mt={0.8}>
                  <div className={styles.podcast__bar__progress} style={{width: '30%'}}></div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background:
                'url(https://www.teclasap.com.br/wp-content/uploads/2011/09/city-x-town.png) no-repeat center center',
              height: '100%',
              width: '100%',
              backgroundSize: 'cover',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

CurrentPodcast.propTypes = {
  heading: PropTypes.string,
}

export default CurrentPodcast
