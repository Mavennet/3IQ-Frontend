import React from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme()

function TeamsDisplay(props) {  
  const {teams, currentLanguage} = props

  // const localeHeading = post.heading[currentLanguage.languageTag]
  console.log("TEAM DISPLAY")
  console.log(currentLanguage)
  console.log(teams)

  return (
    <ThemeProvider theme={theme}>      
    </ThemeProvider>
  )
}

TeamsDisplay.propTypes = {
  teams: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TeamsDisplay
