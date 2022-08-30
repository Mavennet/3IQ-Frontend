import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import RedirectButton from '../RedirectButton'

const builder = imageUrlBuilder(client)

/*
function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
*/

const theme = createTheme()

function DoubleOptions(props) {
  const {firstImage, secondImage, firstButton, secondButton} = props

  return (
    <ThemeProvider theme={theme}>
      <div style={{background: '#f0f0f1'}}>
        <Grid
          container
          component="main"
          sx={{
            alignItems: 'center',
          }}
        >
          <CssBaseline />
          <Grid md={12} style={{color: '#091b3f'}}>
            <Typography
              mt={8}
              ml={2}
              mr={2}
              component="h2"
              variant="h4"
              style={{
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Learn more about our ETFs
            </Typography>
            <Typography
              mt={2}
              ml={2}
              mr={2}
              component="p"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Our ETFs provide investors simple access to bitcoin and ether. No wallet required.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{pt: 5, pb: 10, pl: {md: 10, sm: 0}, pr: {md: 10, sm: 0}}}>
          <Grid
            container
            p={0.7}
            sx={{
              background: '#091b3f',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              md={6}
              xs={12}
              pt={5}
              pb={10}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mt={2}
                mb={5}
                alt="The house from the offer."
                src={builder.image(firstImage).url()}
              />
              <RedirectButton
                key={firstButton._key}
                reverse
                title={firstButton.title}
                sx={{width: {md: 150}, padding: '10px 20px'}}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              pt={5}
              pb={10}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#f0f0f1',
              }}
            >
              <Box
                component="img"
                sx={{
                  maxWidth: {xs: 350, md: 250, xl: 400},
                }}
                mt={2}
                mb={5}
                alt="The house from the offer."
                src={builder.image(secondImage).url()}
              />
              <RedirectButton
                key={secondButton._key}
                title={secondButton.title}
                sx={{width: {md: 150}, padding: '10px 20px'}}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  )
}

DoubleOptions.propTypes = {
  firstImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  secondImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  firstButton: PropTypes.object,
  secondButton: PropTypes.object,
}

export default DoubleOptions
