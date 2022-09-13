import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Box } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TextSeparator.module.css'

function TextSeparator(props) {
  const { portableText } = props

  return (
    <Box sx={{ backgroundColor: '#E8E8EAAD' }}>
      <Container maxWidth="md" >
        <Grid container>
          <Grid item xs={12}>
            <div className={styles.simpleBlockContent}>
              <SimpleBlockContent blocks={portableText} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

TextSeparator.propTypes = {
  portableText: PropTypes.object,
}

export default TextSeparator
