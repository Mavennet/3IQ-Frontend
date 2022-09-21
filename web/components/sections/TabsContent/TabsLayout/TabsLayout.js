import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {
  Grid,
  Container,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Pagination,
  CssBaseline,
  PaginationItem,
} from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import styles from './TabsLayout.module.css'
import NewsHorizontalLayout from '../NewsHorizontalLayout/NewsHorizontalLayout'
import CustomPostCard from '../../custom/CustomPostCard/CustomPostCard'
import CustomNewsletterCard from '../../custom/CustomNewsletterCard/CustomNewsletterCard'
import useMediaQuery from '@mui/material/useMediaQuery'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import groq from 'groq'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function TabPanel(values) {
  const {children, value, index, ...other} = values

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

function handleTab(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

let newsletters
function TabsLayout(props) {
  const {tabItems, currentLanguage, backgroundImage, heading} = props

  const [value, setValue] = useState(0)

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

  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 6
  const [page, setPage] = React.useState(1)
  const [noOfPages, setNoOfPages] = useState(1)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const PageBackButton = () => (
    <RedirectButton
      title="← Previous"
      reverse={false}
      sx={{
        padding: '10px 20px',
        fontSize: '16px',
        borderColor: '#DC6E19',
        background: 'none',
        color: '#dc6e19',
        fontWeight: '300',
        '&:hover': {
          color: '#fff',
          borderColor: '#fff',
        },
      }}
    />
  )

  const PageForwardButton = () => (
    <RedirectButton
      title="Next →"
      reverse={false}
      sx={{
        padding: '10px 20px',
        fontSize: '16px',
        borderColor: '#DC6E19',
        background: 'none',
        color: '#dc6e19',
        fontWeight: '300',
        '&:hover': {
          color: '#fff',
          borderColor: '#fff',
        },
      }}
    />
  )
  const isNewsletter = tabItems.filter((item) => item.isPaginatedNewsletter).length > 0

  useEffect(() => {
    const fetchNewsletters = async () => {
      if (isNewsletter) {
        await client
          .fetch(
            groq`
        *[_type == 'newsCard'] {
          _id,
          _type,
          _rev,
          'localeButtonText': buttonText,
          'localeShortDescription': shortDescription,
          route->,
          post-> {
            _id,
            _type,
            mainImage,
            'localeHeading': heading,
            publishedAt,
            author-> {
              _id,
              _type,
              name,
              email,
              profilePhoto,
            },
          },
        }
        `
          )
          .then((response) => {
            newsletters = response
            setNoOfPages(Math.ceil(newsletters.length / itemsPerPage))
            setIsLoading(false)
          })
      }
    }
    fetchNewsletters()
  }, [])

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
          <Grid container mb={4}>
            <Grid item xs={12}>
              <Box sx={{mt: -2, mb: 4, display: 'flex', justifyContent: 'center'}}>
                <Tabs
                  orientation={mediumViewport ? 'horizontal' : 'vertical'}
                  value={value}
                  onChange={handleChange}
                  aria-label={`${heading} - Tab`}
                  TabIndicatorProps={{style: {display: 'none'}}}
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
                          {...handleTab(i)}
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
                        ) : item.isPaginatedNewsletter ? (
                          <Grid container alignItems="stretch">
                            {isLoading ? (
                              <Grid
                                item
                                key={item._id}
                                style={{display: 'flex'}}
                                py={5}
                                md={12}
                                pr={2}
                                justifyContent="center"
                              >
                                <CircularProgress />
                              </Grid>
                            ) : (
                              newsletters
                                ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                .map((item) => {
                                  return (
                                    <Grid
                                      item
                                      key={item._id}
                                      style={{display: 'flex'}}
                                      pt={5}
                                      md={4}
                                      pr={2}
                                    >
                                      <CustomNewsletterCard
                                        {...item}
                                        languageTag={currentLanguage.languageTag}
                                      />
                                    </Grid>
                                  )
                                })
                            )}
                          </Grid>
                        ) : (
                          <Grid container alignItems="stretch">
                            {item.newsCards?.map((item) => {
                              return (
                                <Grid
                                  item
                                  key={item._id}
                                  style={{display: 'flex'}}
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
                        ))}
                      {item.localecontentBlock && (
                        <Grid container spacing={2} px={2} sx={{background: '#fff'}}>
                          <div className={styles.simpleBlockContent}>
                            <SimpleBlockContent
                              blocks={item.localecontentBlock[currentLanguage.languageTag]}
                            />
                          </div>
                        </Grid>
                      )}
                      {translatedButton && (
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sx={{display: 'flex', justifyContent: 'center'}}
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
                      {!isLoading && isNewsletter && (
                        <Box component="span">
                          <Pagination
                            showFirstButton={false}
                            showLastButton={false}
                            count={noOfPages}
                            page={page}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{previous: PageBackButton, next: PageForwardButton}}
                                {...item}
                              />
                            )}
                            onChange={handlePageChange}
                            defaultPage={1}
                            size="small"
                            siblingCount={2}
                            boundaryCount={1}
                            sx={{
                              '& .MuiPagination-ul': {
                                justifyContent: 'center',
                                padding: '10px',
                                rowGap: 1,
                              },
                              mt: '4em',
                              mb: '4em',
                              textAlign: 'center',
                              color: '#dc6e19',
                            }}
                          />
                        </Box>
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
