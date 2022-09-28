import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../SimpleBlockContent'
import styles from './FundDocuments.module.css'
import {Typography, Box} from '@mui/material'

function FundDocuments(props) {
  const {title, text} = props

  return (
    <Box>
      <Typography sx={{fontWeight: 'bold', color: '#0082e5'}} component="h2" variant="h4">{title}</Typography>
      <div className={styles.textSection}>
        <SimpleBlockContent blocks={text} />
      </div>
    </Box>
  )
}

FundDocuments.propTypes = {
  title: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.object),
}

export default FundDocuments
