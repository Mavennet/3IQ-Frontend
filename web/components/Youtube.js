import React from 'react'
import PropTypes from 'prop-types'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import { Grid } from '@mui/material'

function Youtube(node) {
  const { url } = node.value

  if (!url) {
    return undefined
  }

  const id = getYouTubeId(url)

  const opts = {
    width: '100%',
    height: '280',
    margin: '10px'
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <YouTube videoId={id} opts={opts} />
    </Grid>
  )
}

Youtube.propTypes = {
  node: PropTypes.shape({
    value: PropTypes.shape({
      url: PropTypes.string,
      _key: PropTypes.string,
      _type: PropTypes.string,
    }),
  }),
}
export default Youtube
