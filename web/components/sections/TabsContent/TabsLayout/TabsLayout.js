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
import useMediaQuery from '@mui/material/useMediaQuery'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import TabItem from '../TabItem/TabItem'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
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
                  // scrollButtons="auto"
                >
                  {tabItems &&
                    tabItems.map((item, i) => {
                      return (
                        <Tab
                          fullWidth
                          key={item._id}
                          // wrapped
                          label={
                            item.localeName[currentLanguage.languageTag] || 'Missing Tab Label'
                          }
                          onClick={() => handleTab(i)}
                          sx={{whiteSpace: 'nowrap'}}
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
                    <TabItem
                      {...item}
                      translatedButton={translatedButton}
                      currentLanguage={currentLanguage}
                      key={item._id}
                      value={value}
                      index={i}
                    />
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
