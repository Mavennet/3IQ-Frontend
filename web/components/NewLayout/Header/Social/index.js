import React from 'react'
import { Box, Link } from '@mui/material'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

function Social(props) {
  const { youtubeUrl, linkedinUrl, twitterUrl } = props

  return (
    <Box sx={{ display: 'flex' }} mr={{ xs: 0, sm: 20, md: 40 }} ml={{lg: 3}} mb={{lg: 1}}>
      <ul className={styles.social}>
        <li>
          <Link href={twitterUrl} color="inherit" target='_blank' rel="noopener"><FaTwitter /></Link>
        </li>
        <li>
          <Link href={linkedinUrl} color="inherit" target='_blank' rel="noopener"><FaLinkedinIn /></Link>
        </li>
        <li>
          <Link href={youtubeUrl} color="inherit" target='_blank' rel="noopener"><FaYoutube /></Link>
        </li>
      </ul>
    </Box>
  )
}

Social.propTypes = {
  linkedinUrl: PropTypes.string,
  youtubeUrl: PropTypes.string,
  twitterUrl: PropTypes.string
}


export default Social
