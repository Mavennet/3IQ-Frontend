/* eslint-disable no-debugger, no-console */
import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, CssBaseline } from '@mui/material'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './ReadyToInvest.module.css'
import RedirectButton from '../../RedirectButton/RedirectButton'

const builder = imageUrlBuilder(client)

const theme = createTheme()

function ReadyToInvest(props) {
  const { heading, buttonText, backgroundColor } = props

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: backgroundColor && backgroundColor
      }}>
        <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'lg' } }} >
          <Grid container pt={6} pb={8}>
            <CssBaseline />
            {
              heading && (
                <Grid item xs={12} mb={4}>
                  <div className={styles.simpleBlockContent}>
                    <SimpleBlockContent blocks={heading} />
                  </div>
                </Grid>
              )
            }
            <Grid item xs={12} mx={'auto'} display={'inline-flex'} justifyContent={'center'}>
              <RedirectButton
                title={<SimpleBlockContent blocks={buttonText} />}
                reverse={false}
                sx={{ width: { xs: '100%', md: '18%' }, padding: '8px 25px', fontSize: '20px', fontWeight: '400', }}
              ></RedirectButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider >
  )
}

ReadyToInvest.propTypes = {
  _id: PropTypes.string,
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundColor: PropTypes.string,
  footerText: PropTypes.object,
}

export default ReadyToInvest
