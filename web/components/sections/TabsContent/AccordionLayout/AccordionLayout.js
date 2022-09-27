import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './AccordionLayout.module.css'
import SimpleBlockContent from '../../../SimpleBlockContent'
import { Container } from '@mui/material'
import CustomAccordions from '../../custom/CustomAccordion/CustomAccordion'
import CustomTab from '../../custom/CustomTab/CustomTab'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const theme = createTheme()

function AccordionLayout(props) {
  const { heading, description, tabItems, currentLanguage, backgroundImage } = props

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        pb: 4,
        background:
          backgroundImage &&
          `url("${urlFor(backgroundImage)
            .url()}") no-repeat center center`,
        backgroundSize: 'cover',
        bgcolor: backgroundImage ? '#091b3f' : '#fff',
      }}>
        <Container maxWidth={'md'} sx={{background: backgroundImage ? '#fff' : 'none'}}>
          <Grid container>
            <CssBaseline />
            <Grid xs={12} md={12}>
              <Box className={styles.heading}>
                {heading && (
                  <Typography mt={8} component="h2" variant="h4">
                    {heading}
                  </Typography>
                )}
                {description && (
                  <div className={styles.description}>
                    <SimpleBlockContent blocks={description} />
                  </div>
                )}
              </Box>
              <Box>
                <Box sx={{ display: { md: 'none' } }}>
                  <CustomAccordions items={tabItems} languageTag={currentLanguage.languageTag} />
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <CustomTab items={tabItems} languageTag={currentLanguage.languageTag} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

AccordionLayout.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object
}

export default AccordionLayout
