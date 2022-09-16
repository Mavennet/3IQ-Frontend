import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Box, Tabs, Tab, Typography } from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import styles from './TabsLayout.module.css'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import { format, parseISO } from 'date-fns'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    h1: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    h5: {
      verticalAlign: 'middle',
      fontSize: '14px',
      color: '#77757F'
    },
    p: {
      fontSize: 16,
      color: '#000'
    }
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
          "&.Mui-selected": {
            border: 'none',
            color: '#fff',
            textDecoration: 'underline',
            textUnderlineOffset: '10px',
            fontWeight: '900'
          }
        }
      }
    }
  }
})

function TabPanel(values) {
  const { children, value, index, ...other } = values;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={styles.simpleBlockContent}>
          {children}
        </div>
      )}
    </div>
  );
}

function handleTab(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsLayout(props) {
  const { tabItems, currentLanguage } = props

  const builder = imageUrlBuilder(client)

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container mb={4}>
          <Grid item xs={12}>
            <Box sx={{ mt: -2, mb: 4, display: 'flex', justifyContent: 'center' }}>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { display: "none", }, }}
              >
                {
                  tabItems && (
                    tabItems.map((item, i) => {
                      return (
                        <Tab
                          key={item._id}
                          wrapped
                          label={item.localeName[currentLanguage.languageTag] || 'Missing Tab Label'}
                          {...handleTab(i)}
                        />
                      )
                    })
                  )
                }
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} mt={5}>
            {
              tabItems && (
                tabItems.map((item, i) => {
                  return (
                    <TabPanel key={item._id} value={value} index={i}>
                      {
                        item.newsCards?.length > 0 ? (
                          item.newsCards?.map((item) => {
                            return (
                              <Grid container mb={4} spacing={2} key={item._id}>
                                <Grid item xs={12} sm={12} md={3}>
                                  <div className={styles.imgGrid}>
                                    {
                                      item.post?.mainImage && (
                                        <Image
                                          src={builder.image(item.post?.mainImage.asset._ref).url()}
                                          alt={item.post?.heading}
                                          layout='fill'
                                          objectFit='cover'
                                        />
                                      )
                                    }
                                  </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9}>
                                  {item.post?.localeHeading && (
                                    <Typography component="h1" variant="h1">
                                      {item.post?.localeHeading[currentLanguage.languageTag]}
                                    </Typography>
                                  )}
                                  {item.post?.publishedAt && (
                                    <Typography variant="h5" my={1}>
                                      {format(parseISO(item.post?.publishedAt), 'MMMM d, yyyy')}
                                    </Typography>
                                  )}
                                  {
                                    item.localeShortDescription && (
                                      <SimpleBlockContent blocks={item.localeShortDescription[currentLanguage.languageTag]} />
                                    )
                                  }
                                  {
                                    item.route && item.localeButtonText && (
                                      <RedirectButton
                                        {...item}
                                        title={`${item.localeButtonText[currentLanguage.languageTag]} »`}
                                        sx={{
                                          width: 'auto',
                                          fontSize: '14px',
                                          border: '2px solid #DC6E19',
                                          padding: '2px 5px',
                                          borderRadius: '0px',
                                          color: '#DC6E19',
                                          fontWeight: '400',
                                          background: 'none',
                                        }}
                                      />
                                    )
                                  }
                                </Grid>
                              </Grid>
                            )
                          })
                        ) : (
                          <Grid container spacing={2}>
                            <SimpleBlockContent blocks={item.localecontentBlock[currentLanguage.languageTag]} />
                          </Grid>
                        )
                      }
                      {
                        item.localeButton && (
                          <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} my={4}>
                              <RedirectButton
                                {...item.localeButton[currentLanguage.languageTag]}
                                sx={{ padding: '10px 20px', fontSize: '16px', background: '#DC6E19', borderColor: '#DC6E19', color: '#fff', fontWeight: '300' }}
                              />
                            </Grid>
                          </Grid>
                        )
                      }
                    </TabPanel>
                  )
                })
              )
            }
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

TabsLayout.propTypes = {
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TabsLayout
