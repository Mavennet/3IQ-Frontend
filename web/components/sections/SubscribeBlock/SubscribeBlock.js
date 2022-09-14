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

function SubscribeBlock(props) {
  const {
    firstSubscribeDescription,
    firstSubscribeButtonText,
    firstSubscribeSrc,
    secondSubscribeDescription,
    secondSubscribeButtonText,
    secondSubscribeSrc,
    thirdSubscribeDescription,
    thirdSubscribeButtonText,
    thirdSubscribeSrc
  } = props

  console.log(firstSubscribeDescription, firstSubscribeButtonText, firstSubscribeSrc, secondSubscribeDescription, secondSubscribeButtonText, secondSubscribeSrc, thirdSubscribeDescription, thirdSubscribeButtonText, thirdSubscribeSrc)

  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

SubscribeBlock.propTypes = {
  firstSubscribeDescription: PropTypes.object,
  firstSubscribeButtonText: PropTypes.string,
  firstSubscribeSrc: PropTypes.string,
  secondSubscribeDescription: PropTypes.object,
  secondSubscribeButtonText: PropTypes.string,
  secondSubscribeSrc: PropTypes.string,
  thirdSubscribeDescription: PropTypes.object,
  thirdSubscribeButtonText: PropTypes.string,
  thirdSubscribeSrc: PropTypes.string,
}

export default SubscribeBlock
