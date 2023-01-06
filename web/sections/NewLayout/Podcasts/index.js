import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CurrentPodcast from './CurrentPodcast'
import PodcastCard from './PodcastCard'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const builder = imageUrlBuilder(client)

function Podcasts(props) {
  const {heading} = props

  console.log(props)

  return (
    <>
      <Box bgcolor={'#EBEBEB'}>
        <Container>
          <CurrentPodcast />
        </Container>
      </Box>
      <Box >
        <Container>
          <PodcastCard />
          <PodcastCard />
          <PodcastCard />
        </Container>
      </Box>
    </>
  )
}

Podcasts.propTypes = {
  heading: PropTypes.string,
}

export default Podcasts
