import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../SimpleBlockContent'
import styles from './TextSection.module.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function TextSection(props) {
  const {text} = props

  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{p: 5, pt: 0, pl:{xs: 1}}}>
          <Box sx={{pt: 5, align: 'left'}}>
            <div className={styles.textSection}>{text && <SimpleBlockContent blocks={text} />}</div>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

TextSection.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
}

export default TextSection
