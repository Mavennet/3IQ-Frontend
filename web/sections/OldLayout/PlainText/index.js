import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'


const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      p {
        font-family: 'Europa';
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
      }
      
      a {
        font-family: 'Europa';
        color: #fff;
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }`,
    },
  },
})

function PlainText(props) {
  const { portableText } = props
  console.log(props)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#F9F9F9' }}>
        <Container sx={{ py: '50px' }}>
          <SimpleBlockContent className='simpleBlockContent' blocks={portableText} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

PlainText.propTypes = {
  portableText: PropTypes.object,
}

export default PlainText
