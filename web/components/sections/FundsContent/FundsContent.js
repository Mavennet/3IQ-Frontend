import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container, Grid, Box, Tabs, Tab, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import RedirectButton from '../../RedirectButton/RedirectButton'
import SimpleBlockContent from '../../SimpleBlockContent'
import RenderSections from '../../RenderSections'
import styles from './FundsContent.module.css'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function handleTab(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const tabGridSx = {
  background: '#e8e8ea',
  minHeight: '250px',
}

const gridMainHeaderSx = {
  display: {
    md: 'block',
    xs: 'none',
  },
  textAlign: 'center',
  mt: 4,
  mb: 4,
}

const gridGeneratedHeaderSx = {
  textAlign: 'center',
  mt: 4,
  mb: 4,
  display: {
    md: 'none',
    xs: 'block',
  },
}

function FundsContent(props) {
  const { currentLanguage, fundItems, isFixedWhenScroll, currentCountry, allRoutes } = props
  const [value, setValue] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [navFixed, setNavFixed] = useState(false)
  const mediumViewport = useMediaQuery('(min-width:1024px)')
  const fixedNavRef = React.useRef()

  const handleScroll = () => {
    const position = window.scrollY
    if (position <= 560) {
      setNavFixed(false)
    }
    setScrollPosition(position)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Europa',
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

  const fundTypes = []

  fundItems.forEach((fundItem) => {
    const localeName = fundItem.localeName[currentLanguage.languageTag]
    if (localeName) {
      !(fundTypes.indexOf(localeName) >= 0) && fundTypes.push(localeName)
    }
  })

  const createSection = (content) => {
    const contentWithDefaultLanguage = []
    content &&
      content.map((c) =>
        contentWithDefaultLanguage.push({ ...c, currentLanguage, currentCountry })
      )
    return contentWithDefaultLanguage
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  React.useEffect(() => {
    if (scrollPosition) {
      if (
        scrollPosition >= fixedNavRef?.current?.offsetTop
      ) {
        setNavFixed(true)
      } else {
        setNavFixed(false)
      }
    }
  }, [scrollPosition])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'lg'}>
        <Grid item xs={12}>
          <div ref={fixedNavRef} className={navFixed && isFixedWhenScroll && styles.fixedLayout}>
            <Box sx={{ mt: -2, mb: 4, display: 'flex', justifyContent: 'center' }}>
              <Tabs
                orientation={mediumViewport ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                // aria-label={`${heading} - Tab`}
                TabIndicatorProps={{ style: { display: 'none' } }}
              >
                {fundTypes &&
                  fundTypes.map((item, i) => {
                    return (
                      <Tab
                        key={`fundType_${i}`}
                        wrapped
                        href={`#section_${i}`}
                        label={item || 'Missing Tab Label'}
                        {...handleTab(i)}
                        sx={{
                          '&:hover': {
                            textDecoration: 'underline!important',
                            textUnderlineOffset: '10px!important',
                            transition: '0.3s'
                          }
                        }}
                      ></Tab>
                    )
                  })}
              </Tabs>
            </Box>
          </div>
        </Grid>

        {fundItems &&
          fundItems.map((fundItem, index) => (
            <Grid key={`fundItem${index}`} container mt={10} id={`section_${index}`} spacing={6}>
              {console.log(fundItem)}
              {
                !fundItem.hiddenTitle && (
                  <Grid item sx={{ borderBottom: '5px solid #0082e5', color: '#0082e5' }} xs={12}>
                    <Typography component="h2" variant="h4" sx={{ fontWeight: 'bold' }}>
                      {fundItem.localeName[currentLanguage.languageTag]}
                    </Typography>
                  </Grid>
                )
              }
              {!fundItem.fundSections && (
                <Grid item container alignItems="stretch" spacing={2} xs={12}>
                  <Grid item sx={gridMainHeaderSx} xs={false} md={3}>
                    <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                      Product
                    </Typography>
                  </Grid>
                  <Grid item sx={gridMainHeaderSx} xs={false} md={2}>
                    <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                      {fundItem.localeCodeTitle &&
                        fundItem.localeCodeTitle[currentLanguage.languageTag]}
                    </Typography>
                    <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                      {fundItem.localeCodeObservation &&
                        fundItem.localeCodeObservation[currentLanguage.languageTag]}
                    </Typography>
                  </Grid>
                  <Grid item sx={gridMainHeaderSx} xs={false} md={5}>
                    <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                      Highlights
                    </Typography>
                  </Grid>
                  <Grid item sx={gridMainHeaderSx} xs={false} md={2}></Grid>
                </Grid>
              )}
              {fundItem.products &&
                fundItem.products.map((product, index) => (
                  <Box sx={{ width: '100%' }} key={`product_${index}`}>
                    <Grid container item mb={2} alignItems="stretch" spacing={2}>
                      <Grid item container xs={12} md={3}>
                        <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                          <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                            Product
                          </Typography>
                        </Grid>
                        <Grid sx={tabGridSx} container>
                          <Box my={'auto'} style={{ textAlign: 'center', width: '100%' }}>
                            <img
                              style={{ maxWidth: '90%', maxHeight: '220px', margin: '0 auto' }}
                              src={urlFor(product.mainImage.asset._ref).url()}
                              alt={product.mainImage.alt}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} md={2}>
                        <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                          <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                            {fundItem.localeCodeTitle &&
                              fundItem.localeCodeTitle[currentLanguage.languageTag]}
                          </Typography>
                          <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                            {fundItem.localeCodeObservation &&
                              fundItem.localeCodeObservation[currentLanguage.languageTag]}
                          </Typography>
                        </Grid>
                        <Grid sx={{ ...tabGridSx, background: 'none' }} container>
                          {product.codes ? (
                            product.codes.map((code, index) => (
                              <Grid
                                item
                                container
                                xs={12}
                                key={`code_${index}`}
                                sx={{
                                  background: '#e8e8ea',
                                  minHeight: `${230 / product.codes.length}px`,
                                  mt: index > 0 && `${20 / (product.codes.length - 1)}px`,
                                }}
                              >
                                <Box sx={{ width: '100%', my: 'auto', textAlign: 'center' }}>
                                  <Typography component="h4" variant="h6">
                                    {code}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))
                          ) : (
                            <Grid container sx={tabGridSx}></Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} md={5}>
                        <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                          <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                            Highlights
                          </Typography>
                        </Grid>
                        <Grid sx={tabGridSx} container>
                          <Box sx={{ my: 'auto', mx: 2 }}>
                            {product.localeHighlights &&
                              product.localeHighlights[currentLanguage.languageTag] && (
                                <SimpleBlockContent
                                  blocks={product.localeHighlights[currentLanguage.languageTag]}
                                />
                              )}
                          </Box>
                        </Grid>
                        {index === fundItem.products.length - 1 && (
                          <Typography sx={{ color: 'gray', fontSize: '14px', mr: 3, mt: 3, display: { md: 'none' } }}>
                            {fundItem.localeObservation &&
                              fundItem.localeObservation[currentLanguage.languageTag]}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item container xs={12} md={2}>
                        <Grid sx={tabGridSx} container>
                          <Box my={'auto'} style={{ width: '100%', textAlign: 'center' }}>
                            {fundItem.localeReadMoreText && (
                              <RedirectButton
                                sx={{
                                  mx: 'auto',
                                  width: '130px',
                                  mb: 3,
                                  background: '#0082E5',
                                  border: '3px solid #0082E5',
                                  fontWeight: 'normal',
                                  '&:hover': {
                                    color: '#0082E5',
                                  },
                                }}
                                route={product.readMoreRoute && product.readMoreRoute}
                                title={fundItem.localeReadMoreText[currentLanguage.languageTag]}
                              />
                            )}
                            {fundItem.localeTextBetweenButtons && (
                              <Typography m={3}>
                                {fundItem.localeTextBetweenButtons[currentLanguage.languageTag]}
                              </Typography>
                            )}
                            {fundItem.localeContactUsText && (
                              <RedirectButton
                                sx={{ mx: 'auto', width: '130px', fontWeight: 'normal' }}
                                link={product.mailtoLink}
                                title={fundItem.localeContactUsText[currentLanguage.languageTag]}
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item mb={4} sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="stretch" spacing={2}>
                      <Grid item xs={5} />
                      <Grid item xs={5}>
                        {index === fundItem.products.length - 1 && (
                          <Typography sx={{ color: 'gray', fontSize: '14px' }}>
                            {fundItem.localeObservation &&
                              fundItem.localeObservation[currentLanguage.languageTag]}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                  </Box>
                ))
              }
              {fundItem.fundSections && (
                <RenderSections
                  sections={createSection(fundItem.fundSections)}
                  routes={allRoutes}
                />
              )}
            </Grid>
          ))}
      </Container>
    </ThemeProvider>
  )
}

FundsContent.propTypes = {
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  fundItems: PropTypes.fundItems,
  isFixedWhenScroll: PropTypes.bool,
  allRoutes: PropTypes.object,
}

export default FundsContent
