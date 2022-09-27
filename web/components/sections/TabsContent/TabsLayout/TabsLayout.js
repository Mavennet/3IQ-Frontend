import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  Container,
  Box,
  Tabs,
  Tab,
  CssBaseline,
} from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import styles from './TabsLayout.module.css'
import NewsHorizontalLayout from '../NewsHorizontalLayout/NewsHorizontalLayout'
import CustomPostCard from '../../custom/CustomPostCard/CustomPostCard'
import useMediaQuery from '@mui/material/useMediaQuery'
import NewsletterGrid from '../NewsletterGrid/NewsletterGrid'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function TabPanel(values) {
  const { children, value, index, ...other } = values

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={styles.simpleBlockContent}>{children}</div>}
    </div>
  )
}

function TabsLayout(props) {
  const { tabItems, currentLanguage, backgroundImage, heading } = props

  const [value, setValue] = React.useState(0)

  const mediumViewport = useMediaQuery('(min-width:1024px)')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Europa',
      h1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: backgroundImage ? '#fff' : '#000',
      },
      h5: {
        verticalAlign: 'middle',
        fontSize: '14px',
        color: backgroundImage ? '#fff' : '#77757F',
      },
      p: {
        fontSize: 16,
        color: backgroundImage ? '#fff' : '#000',
      },
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '15px 40px',
            fontFamily: 'Europa',
            fontSize: '20px',
            background: '#DC6E19',
            color: '#fff',
            textTransform: 'capitalize',
            '&.Mui-selected': {
              border: 'none',
              color: '#fff!important',
              textDecoration: 'underline!important',
              textUnderlineOffset: '10px!important',
              fontWeight: '900',
            },
            '&:hover': {
              textDecoration: 'underline!important',
              textUnderlineOffset: '10px!important',
              transition: '0.3s'
            }
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
      .MuiButtonBase-root.MuiPaginationItem-root {
          color: #dc6e19;
      }
      .MuiButtonBase-root.MuiPaginationItem-root:hover {
          color: #fff;
      }
      .MuiButtonBase-root.Mui-selected.MuiPaginationItem-root {
          color: #fff;
      }
      .MuiButtonBase-root.Mui-disabled.MuiPaginationItem-root {
          display: none;
      }

      `,
      },
    },
  })

  const handleTab = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
            backgroundImage && `url("${urlFor(backgroundImage).url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: backgroundImage ? '#091b3f' : '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Grid container pb={4}>
            <Grid item xs={12}>
              <Box sx={{ mt: -2, mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Tabs
                  orientation={mediumViewport ? 'horizontal' : 'vertical'}
                  value={value}
                  onChange={handleChange}
                  aria-label={`${heading} - Tab`}
                  TabIndicatorProps={{ style: { display: 'none' } }}
                >
                  {tabItems &&
                    tabItems.map((item, i) => {
                      return (
                        <Tab
                          key={item._id}
                          wrapped
                          label={
                            item.localeName[currentLanguage.languageTag] || 'Missing Tab Label'
                          }
                          onClick={() => handleTab(i)}
                        />
                      )
                    })}
                </Tabs>
              </Box>
            </Grid>
            <Grid item xs={12} mt={5}>
              {tabItems &&
                tabItems.map((item, i) => {
                  const translatedButton =
                    item.localeButton && item.localeButton[currentLanguage.languageTag]
                  return (
                    <TabPanel key={item._id} value={value} index={i}>
                      {item.localecontentBlock && (
                        <Grid container ml={0} spacing={2} sx={{ background: '#fff' }} className={styles.simpleBlockContent}>
                          <SimpleBlockContent
                            blocks={item.localecontentBlock[currentLanguage.languageTag]}
                          />
                        </Grid>
                      )}
                      {
                        item.isPaginatedNewsletter && (
                          <NewsletterGrid
                            {...item}
                            currentLanguage={currentLanguage}
                            key={item._id}
                          />
                        )
                      }
                      {item.newsCards?.length > 0 &&
                        (item.isNewsCardsHorizontalLayout ? (
                          item.newsCards?.map((item) => {
                            return (
                              <NewsHorizontalLayout
                                {...item}
                                currentLanguage={currentLanguage}
                                key={item._id}
                              />
                            )
                          })
                        ) : (
                          <Grid container alignItems="stretch">
                            {item.newsCards?.map((item) => {
                              return (
                                <Grid
                                  item
                                  key={item._id}
                                  style={{ display: 'flex' }}
                                  pt={5}
                                  md={4}
                                  pr={2}
                                >
                                  <CustomPostCard
                                    {...item}
                                    languageTag={currentLanguage.languageTag}
                                  />
                                </Grid>
                              )
                            })}
                          </Grid>
                        ))
                      }
                      {translatedButton && (
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                            my={4}
                          >
                            <RedirectButton
                              {...translatedButton}
                              sx={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                background: '#DC6E19',
                                borderColor: '#DC6E19',
                                color: '#fff',
                                fontWeight: '300',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </TabPanel>
                  )
                })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

TabsLayout.propTypes = {
  tabItems: PropTypes.array,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
  heading: PropTypes.string,
}

export default TabsLayout
