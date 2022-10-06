import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Container, Box} from '@mui/material'
import TextSlide from '../../TextSlide/TextSlide'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h3: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

function AnimatedHero(props) {
  const {heading, animatedPhrases, currentLanguage} = props
  const [localePhrases, setLocalePhrases] = useState([])

  useEffect(() => {
    const phrases = []
    animatedPhrases.forEach((ap) => {
      if (ap[currentLanguage.languageTag]) {
        phrases.push(ap[currentLanguage.languageTag])
      }
    })
    setLocalePhrases(phrases)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#091b3f',
          pt: {lg: 12, xs: 8},
          pb: {lg: 18, xs: 14},
        }}
      >
        <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
          <Box sx={{p: '5 1', pr: 1, pl: {xs: 1}}}>
            <Box sx={{pt: 5, color: '#fff', align: 'left'}}>
              <TextSlide text={heading} items={localePhrases} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

AnimatedHero.propTypes = {
  heading: PropTypes.string,
  animatedPhrases: PropTypes.array,
  currentLanguage: PropTypes.object
}

export default AnimatedHero
