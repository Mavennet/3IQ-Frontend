import React from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'

const theme = createTheme()

function Hero(props) {
  const {heading, description} = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#091b3f',
          pt: 20,
          pb: 20,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{p: 5}}>
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h3" style={{fontWeight: 'bold'}} gutterBottom>
                {heading}
              </Typography>
              <div className={styles.description}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

Hero.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
}

export default Hero
