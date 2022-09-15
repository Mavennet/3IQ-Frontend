import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './TabsContent.module.css'
import SimpleBlockContent from '../../SimpleBlockContent'
import {Container} from '@mui/material'
import CustomizedAccordions from '../../custom/CustomizedAccordion/CustomizedAccordion/CustomizedAccordion'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const builder = imageUrlBuilder(client)
const theme = createTheme()

  const TAB_ITEMS = [
    {
      header: 'The Bitcoin Fund',
      sections: [
        {
          title: 'Regulatory',
          items: [
            'March 31, 2022 Annual Information Form',
            'March 31, 2022 Annual Information Form (FR)',
            'November 5, 2020 Prospectus (EN)',
            'November 5, 2020 Prospectus (FR)',
          ],
        },
        {
          title: 'Portfolio Holdings',
          items: [
            'March 31, 2022 Quarterly Portfolio Disclosure (EN)',
            'March 31, 2022 Quarterly Portfolio Disclosure (FR)',
            'September 30, 2021 Quarterly Portfolio Disclosure (EN)',
            'September 30, 2021 Quarterly Portfolio Disclosure (FR)',
            'March 31, 2021 Quarterly Portfolio Disclosure (EN)',
            'March 31, 2021 Quarterly Portfolio Disclosure (FR)',
            'September 30, 2020 Quarterly Portfolio Disclosure (EN)',
            'September 30, 2020 Quarterly Portfolio Disclosure (FR',
          ],
        },
      ],
    },
    {
      header: 'The Ether Fund',
      sections: [
        {
          title: 'Regulatory',
          items: [
            'March 31, 2022 Annual Information Form',
            'March 31, 2022 Annual Information Form (FR)',
            'November 5, 2020 Prospectus (EN)',
            'November 5, 2020 Prospectus (FR)',
          ],
        },
        {
          title: 'Portfolio Holdings',
          items: [
            'March 31, 2022 Quarterly Portfolio Disclosure (EN)',
            'March 31, 2022 Quarterly Portfolio Disclosure (FR)',
            'September 30, 2021 Quarterly Portfolio Disclosure (EN)',
            'September 30, 2021 Quarterly Portfolio Disclosure (FR)',
            'March 31, 2021 Quarterly Portfolio Disclosure (EN)',
            'March 31, 2021 Quarterly Portfolio Disclosure (FR)',
            'September 30, 2020 Quarterly Portfolio Disclosure (EN)',
            'September 30, 2020 Quarterly Portfolio Disclosure (FR',
          ],
        },
      ],
    },
  ]


function TabsContent(props) {
  const {heading, description, tabItems, currentLanguage} = props

  return (
    <ThemeProvider theme={theme}>
      <div style={{background: '#fff'}}>
        <Container maxWidth={'md'}>
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
              <CustomizedAccordions items={tabItems} languageTag={currentLanguage.languageTag} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
}

TabsContent.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object
}

export default TabsContent
