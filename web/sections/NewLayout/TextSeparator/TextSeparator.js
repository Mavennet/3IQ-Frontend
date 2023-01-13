import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Box, Typography } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

function TextSeparator(props) {
  const { portableText, title, backgroundColor } = props

  return (
    <Box>
      <Container maxWidth={!backgroundColor ? "md" : 'lg'} sx={{ py: backgroundColor && '50px' }}>
        <Grid container>
          <Grid item xs={12} md={10} lg={8}>
            {backgroundColor &&
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: 'var(--font-family-secondary)',
                  fontSize: 'var(--font-size-primary-lg)',
                  color: 'var(--black)',
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
