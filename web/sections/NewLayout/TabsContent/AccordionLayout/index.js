import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './styles.module.scss'
import SimpleBlockContent from '../../../../components/OldLayout/SimpleBlockContent'
import {Container} from '@mui/material'
import CustomAccordions from '../../../OldLayout/custom/CustomAccordion'
import CustomTab from '../../../OldLayout/custom/CustomTab'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const theme = createTheme()

function AccordionLayout(props) {
  const {heading, description, tabItems, currentLanguage, backgroundImage} = props

  const [selected, setSelected] = useState(0)
  const containerRef = useRef(null)

  console.log(tabItems)

  return (
    <>
      <Container maxWidth={'lg'} bgcolor="#F6F6F6">
        <Grid container mt={10} mb={20}>
          <Grid item md={12}>
            <h4>Investment Funds</h4>
          </Grid>
          <Grid item md={12} sx={{display: {sm: 'block', md: 'none'}}}>
            <div className={`${styles.menu} ${styles.light__blue}`} ref={containerRef}>
              <ul>
                {tabItems &&
                  tabItems.map((item, index) => {
                    return (
                      <li onClick={() => setSelected(index)} key={index}>
                        <a className={selected == index && styles.active}>
                          {item.localeName[currentLanguage.languageTag]}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </Grid>
          <Grid item md={3} sx={{display: {xs: 'none', md: 'block'}}}>
            {tabItems.map((item, index) => (
              <p
                onClick={() => setSelected(index)}
                className={`${styles.item} ${selected == index && styles.active}`}
              >
                {item.localeName && item.localeName[currentLanguage.languageTag]}
              </p>
            ))}
          </Grid>

          <Grid item md={9} pt={2} pl={2}>
            <div className={styles.content}>
              <SimpleBlockContent
                blocks={tabItems[selected].localecontentBlock[currentLanguage.languageTag]}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            pb: 4,
            background:
              backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
            backgroundSize: 'cover',
            bgcolor: backgroundImage ? '#091b3f' : '#fff',
          }}
        >
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
                  <Box sx={{display: {md: 'none'}}}>
                    <CustomAccordions items={tabItems} languageTag={currentLanguage.languageTag} />
                  </Box>
                  <Box sx={{display: {xs: 'none', md: 'block'}}}>
                    <CustomTab items={tabItems} currentLanguage={currentLanguage} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}

AccordionLayout.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
}

export default AccordionLayout
