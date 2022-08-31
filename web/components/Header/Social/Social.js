import React from 'react'
import { Box } from '@mui/material'
import styles from './Social.module.css'
import { FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

function Social(props) {
  return (
    <Box sx={{ display: 'flex' }} mr={{ xs: 0, sm: 20, md: 40 }}>
      <button
        className={styles.socialTwitter}
        href={'/'}
      >
        <FaTwitter />
      </button>
      <button
        className={styles.socialLinkedin}
        href={'/'}
      >
        <FaLinkedinIn />
      </button>
      <button
        className={styles.socialYoutube}
        href={'/'}
      >
        <FaYoutube />
      </button>
    </Box>
  )
}

export default Social
