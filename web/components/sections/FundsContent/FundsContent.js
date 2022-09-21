import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Container, Grid} from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

const gridSx = {
  background: '#e8e8ea',
  height: '200px',
}

function FundsContent(props) {
  const {currentCountry, currentLanguage, fundItems} = props

  console.log(props) // REMOVER

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'lg'}>
        <Grid container alignItems="stretch" spacing={2}>
          <Grid item md={3}>
            <Grid sx={gridSx} container></Grid>
          </Grid>
          <Grid item md={2}>
            <Grid sx={gridSx} container></Grid>
          </Grid>
          <Grid item md={5}>
            <Grid sx={gridSx} container></Grid>
          </Grid>
          <Grid item md={2}>
            <Grid sx={gridSx} container></Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

FundsContent.propTypes = {
  currentCountry: PropTypes.object,
  currentLanguage: PropTypes.object,
  fundItems: PropTypes.fundItems,
}

export default FundsContent
