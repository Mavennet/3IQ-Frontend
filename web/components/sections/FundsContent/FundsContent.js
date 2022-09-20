import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
})

function FundsContent(props) {  
  const {title} = props

  console.log(title) // REMOVER
  
  return (
    <ThemeProvider theme={theme}>      
    </ThemeProvider>
  )
}

FundsContent.propTypes = {
  title: PropTypes.string,
}

export default FundsContent
