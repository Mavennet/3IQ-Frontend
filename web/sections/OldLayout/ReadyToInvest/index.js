/* eslint-disable no-debugger, no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, CssBaseline } from '@mui/material'
 import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from'./styles.module.scss'
 import RedirectButton from '../../../components/OldLayout/RedirectButton'


const theme = createTheme()

function ReadyToInvest(props) {
  const { heading, currentLanguage, ctaButton, backgroundColor } = props

  const localeButton = ctaButton[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: backgroundColor && backgroundColor
      }}>
        <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'lg' } }} >
          <Grid container pt={9} pb={8}>
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
            {localeButton && (localeButton.route || localeButton.link) &&
              (<Grid item xs={12} mx={'auto'} sx={{ '& > a': { mx: 'auto', width: { xs: '100%', md: '18%' } } }} display={'inline-flex'} justifyContent={'center'}>
                <RedirectButton
                  {...localeButton}
                  reverse={false}
                  sx={{ width: '100%', padding: '16px 25px', fontSize: '20px', fontWeight: '400', }}
                ></RedirectButton>
              </Grid>)}
          </Grid>
        </Container>
      </Box >
    </ThemeProvider >
  )
}

ReadyToInvest.propTypes = {
  heading: PropTypes.object,
  backgroundColor: PropTypes.string,
  ctaButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default ReadyToInvest
