import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Typography } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './TableSection.module.css'

function TableSection(props) {
  const { name, embed, isEnableName } = props

  return (
    <Container>
      <Grid container py={6}>
        {
          isEnableName && (
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: 34,
                  fontFamily: 'Europa',
                  color: '#0082E5',
                  fontWeight: '900'
                }}
              >{name}</Typography>
            </Grid>
          )
        }
        {
          embed && (
            <Grid item xs={12} mb={3}>
              <div className={styles.simpleBlockContent}>
                <SimpleBlockContent blocks={embed} />
              </div>
            </Grid>
          )
        }
      </Grid>
    </Container>
  )
}

TableSection.propTypes = {
  name: PropTypes.string,
  embed: PropTypes.object,
  isEnableName: PropTypes.bool
}

export default TableSection
