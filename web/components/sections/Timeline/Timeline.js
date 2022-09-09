import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './Timeline.module.css'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import SimpleBlockContent from '../../SimpleBlockContent'
import RedirectButton from '../../RedirectButton/RedirectButton'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme()

function Timeline(props) {
  const {mainImage, heading, backgroundImage, description, button} = props


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage &&
            `url("${urlFor(backgroundImage)
              .url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          pt: 2,
          pb: 2,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{p: 5, pl: 1, pr: 1}}>
            <Box
              component="img"
              sx={{
                maxWidth: {md: 400, xs: 300},
              }}
              alt="The house from the offer." // TODO Ajustar para pegar alt correto configurado no CMS
              src={builder.image(mainImage).url()}
            />
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h5" style={{fontWeight: 'bold'}} gutterBottom>
                {heading}
              </Typography>
              <div className={styles.description}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </Box>

            {button &&
               (
               <RedirectButton
               {...button}
               reverse
               sx={{mt: 4, width: {xs: '100%', md: 'auto'}, padding: '15px 60px'}}
               ></RedirectButton>
              )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

Timeline.propTypes = {
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.object,
  backgroundImage: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
}

export default Timeline
