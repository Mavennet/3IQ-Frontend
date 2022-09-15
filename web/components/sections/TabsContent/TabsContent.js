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
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

function TabsContent(props) {
  const {tabItems, currentLanguage} = props

  console.log(tabItems, currentLanguage)

  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

TabsContent.propTypes = {
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TabsContent
