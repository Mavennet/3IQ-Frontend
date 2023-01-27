import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import {MdPlayCircle} from 'react-icons/md'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const builder = imageUrlBuilder(client)

function PodcastCard(props) {
  const {heading} = props

  return (
    <Box mt={4}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
          <Box
            component="img"
            src="https://www.teclasap.com.br/wp-content/uploads/2011/09/city-x-town.png"
            sx={{
              height: '160px',
              width: '160px',
              pr: 4,
            }}
          />
          <Box>
            <span className={styles.podcast__author}>Podcast by Andrew Lincoln</span>
            <h5 className={styles.podcast__title}>
              Exploring the Custodia Bank Project with Caitlin Long and Angie Dalton
            </h5>
            <p className={styles.podcast__description}>
              Particular take on the possibilities of crypto technologies in the current climate.
              Caitlin’s approach is one we do not hear about so often, and we get to explore how
              Custodia Bank is hoping to harness the powers of new technology.
            </p>
            <Box className={styles.podcast__player}>
              <Box>
                <MdPlayCircle style={{color: '#0082E5', fontSize: '40px'}} />
              </Box>
              <Box pb={1.5} pl={2}>
                <span className={styles.podcast__date}>May 25, 2022</span>
              </Box>
              <Box pb={1.5} pl={2}>
                <span className={styles.podcast__duration}>22 min left</span>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

PodcastCard.propTypes = {
  heading: PropTypes.string,
}

export default PodcastCard
