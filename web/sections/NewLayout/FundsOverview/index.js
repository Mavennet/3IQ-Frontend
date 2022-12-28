import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

function FundsOverview(props) {
  const { title, embed } = props

  return (
    <Grid xs={12} md={8} mt={8}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container>
          <Grid item md={12} pr={{ xs: 0, md: 10 }} mb={{ xs: 6 }}>
            {title && (<h2 className={styles.title}>{title}</h2>)}
            {embed && (
              <Box className={styles.content}>
                <SimpleBlockContent blocks={embed} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

FundsOverview.propTypes = {
  title: PropTypes.object,
  embed: PropTypes.object,
  currentLanguage: PropTypes.object,
  fundSidebarItem: PropTypes.array,
  endpoint: PropTypes.string
}

export default FundsOverview
