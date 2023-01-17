import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container, Grid } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

function Note({ name, leftTextBlock, rightTextBlock }) {
  return (
    <Container sx={{ mt: 15, mb: 8.6 }}>
      <Typography
        sx={{
          fontFamily: 'var(--font-family-primary)',
          fontSize: 'var(--font-size-primary-lg)',
          color: 'var(--black)',
          position: 'relative',
          textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
          margin: 0,
          padding: 0,
          pt: '1.5rem',
          mb: '1.5rem',
        }}
        align={'left'}
        gutterBottom
      >
        {name}
      </Typography>
      <Grid container spacing={2.5}>
        <Grid xs={12} md={6} item>
          <div className={styles.simple__block__content}>
            <SimpleBlockContent blocks={leftTextBlock}></SimpleBlockContent>
          </div>
        </Grid>
        <Grid xs={12} md={6} item>
          <div className={styles.simple__block__content}>
            <SimpleBlockContent blocks={rightTextBlock}></SimpleBlockContent>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

Note.propTypes = {
  name: PropTypes.object,
  rightTextBlock: PropTypes.object,
  leftTextBlock: PropTypes.object,
}

export default Note
