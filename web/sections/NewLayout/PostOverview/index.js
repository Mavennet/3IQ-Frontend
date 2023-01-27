import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Grid, Container, Typography, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

function PostOverview(props) {

  const { leftContent, rightContent, tags, currentLanguage } = props

  return (
    <Box sx={{background: '#CECECE'}}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container py={8} spacing={4} mb={4}>
          <Grid item xs={12} sm={6}>
            <div className={styles.simple__block__content}>
              {leftContent && <SimpleBlockContent blocks={leftContent} />}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} mb={4}>
            <div className={styles.simple__block__content}>
              {rightContent && <SimpleBlockContent blocks={rightContent} />}
            </div>
          </Grid>
          <Grid item xs={12}>
            <ul className={styles.tags}>
              {
                tags && tags.map((item) => {
                  return (
                    <li key={item._key}>{item[currentLanguage.languageTag]}</li>
                  )
                })
              }
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

PostOverview.propTypes = {
  leftContent: PropTypes.object,
  rightContent: PropTypes.object,
  tags: PropTypes.array,
  currentLanguage: PropTypes.object,
}

export default PostOverview
