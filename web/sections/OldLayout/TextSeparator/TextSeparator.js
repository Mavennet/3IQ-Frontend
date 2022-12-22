import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Box, Typography } from '@mui/material'
 import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from'./styles.module.scss'

function TextSeparator(props) {
  const { portableText, title, backgroundColor } = props

  return (
    <Box sx={{ backgroundColor: !backgroundColor ? '#E8E8EAAD' : backgroundColor }}>
      <Container maxWidth={!backgroundColor ? "md" : 'lg'} sx={{ py: backgroundColor && '50px' }}>
        <Grid container>
          <Grid item xs={12}>
            {backgroundColor &&
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
                {title}
              </Typography>}
            <div className={!backgroundColor ? styles.simpleBlockContent : styles.simpleBlockContentProxy}>
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
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default TextSeparator
