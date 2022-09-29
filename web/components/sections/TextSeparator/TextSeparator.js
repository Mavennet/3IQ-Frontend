import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Box, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TextSeparator.module.css'

function TextSeparator(props) {

  const { portableText, name } = props
  const isProxySec = name === 'Vote par procuration' || name === 'Proxy Voting'

  return (
    <Box sx={{ backgroundColor: !isProxySec ? '#E8E8EAAD' : '#F9F9F9' }}>
      <Container maxWidth={!isProxySec ? "md" : 'lg'} sx={{ py: isProxySec && '50px' }}>
        <Grid container>
          <Grid item xs={12}>
            {isProxySec &&
              <Typography
                sx={{
                  position: 'relative',
                  fontWeight: 600,
                  fontSize: 34,
                  lineHeight: 'var(--font-title2-line-height)',
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                  margin: 0,
                  padding: 0,
                  pt: '1.5rem',
                  mb: '1.5rem',
                  color: '#0082E4',
                }}
                align={'left'}
                gutterBottom
              >
                {name}
              </Typography>}
            <div className={!isProxySec ? styles.simpleBlockContent : styles.simpleBlockContentProxy}>
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
