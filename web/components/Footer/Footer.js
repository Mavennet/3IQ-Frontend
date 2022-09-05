import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Box, Typography, Button, CssBaseline, Link } from '@mui/material'
import { FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import styles from './Footer.module.css'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import { getPathFromSlug } from '../../utils/urls'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
})

const breakArray = (array) => {
  const half = Math.ceil(array.length / 2)
  const firstHalf = array.slice(0, half)
  const secondHalf = array.slice(half)
  return {
    firstBlock: firstHalf,
    secondBlock: secondHalf
  }
}

function Footer(props) {

  const {
    currentCountry,
    currentLanguage
  } = props

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          background: '#091b3f',
          color: 'white',
          pt: 6,
          pb: 4,
        }}
      >
        <CssBaseline />
        <Grid item xs={12} md={3} sx={{ borderRight: '6px solid #0082e5', mb: { xs: 8, sm: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }} mb={4}>
            {/* Logo */}
            {
              currentCountry.footerLogo ?
                <Link href={'/'}>
                  <Box
                    component="img"
                    sx={{ maxWidth: '100%', ml: { md: 4 } }}
                    width={180}
                    alt={currentCountry.footerLogo.alt}
                    src={urlFor(currentCountry.footerLogo.asset._ref).url()}
                  />
                </Link> : (
                  <Typography variant="p" paragraph mb={1}> Missing Footer Logo</Typography>
                )
            }
          </Box>
          <Box pl={2} pr={2}>
            <Grid container>
              <Grid item xs={3} mb={4}>
                {
                  currentCountry.footerFirstLeftBlockImage ? (
                    <Box
                      component="img"
                      src={urlFor(currentCountry.footerFirstLeftBlockImage.asset._ref).url()}
                      alt={currentCountry.footerFirstLeftBlockImage.alt}
                      sx={{ maxWidth: '100%' }}
                    />
                  ) : (
                    <Typography variant="p" paragraph mb={1}> Missing First Left Block Image</Typography>
                  )
                }
              </Grid>
              <Grid item xs={9} mb={4} pl={2}>
                {
                  currentCountry?.footerFirstLeftBlockContent &&
                    currentCountry?.footerFirstLeftBlockContent[currentLanguage?.languageTag] ?
                    currentCountry?.footerFirstLeftBlockContent[currentLanguage?.languageTag].map((item) => {
                      const links = item.markDefs
                      return (
                        <Typography variant="p" paragraph mb={1} key={item._key}>
                          {
                            item.children.map((item) => {
                              if (item.marks[0]) {
                                const currentLink = links.find(obj => {
                                  return obj._key === item.marks[0]
                                })
                                return (
                                  <Link
                                    href={currentLink?.href}
                                    underline="hover"
                                    color="inherit"
                                  >
                                    {item.text}
                                  </Link>
                                )
                              } else {
                                return item.text
                              }
                            })
                          }
                        </Typography>
                      )
                    }) : <Typography variant="p" paragraph mb={1}>Missing - First Left Block Content</Typography>
                }
              </Grid>
              <Grid item xs={3}>
                {
                  currentCountry.footerSecondLeftBlockImage ? (
                    <Box
                      component="img"
                      src={urlFor(currentCountry.footerSecondLeftBlockImage.asset._ref).url()}
                      alt={currentCountry.footerSecondLeftBlockImage.alt}
                      sx={{ maxWidth: '100%' }}
                    />
                  ) : (
                    <Typography variant="p" paragraph mb={1}> Missing Second Left Block Image</Typography>
                  )
                }
              </Grid>
              <Grid item xs={9} pl={2}>
                {
                  currentCountry?.footerSecondLeftBlockContent &&
                    currentCountry?.footerSecondLeftBlockContent[currentLanguage?.languageTag] ?
                    currentCountry?.footerSecondLeftBlockContent[currentLanguage?.languageTag].map((item) => {
                      const links = item.markDefs
                      return (
                        <Typography variant="p" paragraph mb={1} key={item._key}>
                          {
                            item.children.map((item) => {
                              if (item.marks[0]) {
                                const currentLink = links.find(obj => {
                                  return obj._key === item.marks[0]
                                })
                                return (
                                  <Link
                                    href={currentLink?.href}
                                    underline="hover"
                                    color="inherit"
                                  >
                                    {item.text}
                                  </Link>
                                )
                              } else {
                                return item.text
                              }
                            })
                          }
                        </Typography>
                      )
                    }) : <Typography variant="p" paragraph mb={1}>Missing - Second Left Block Content</Typography>
                }
                {
                  currentCountry.footerSecondLeftBlockButton && (
                    <Link
                      href={currentCountry.footerSecondLeftBlockButton[currentLanguage?.languageTag].link}
                      underline="hover"
                      color="inherit"
                      target='_blank'
                      rel="noopener"
                    >
                      <Button variant="contained" sx={{ textTransform: 'inherit' }}>{currentCountry.footerSecondLeftBlockButton[currentLanguage?.languageTag].title}</Button>
                    </Link>
                  )
                }
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ pl: { xs: 3, md: 8 }, pr: { xs: 3, md: 0 } }}>
            <Grid container>
              {
                currentCountry.footerNavigation && (
                  breakArray(currentCountry.footerNavigation).firstBlock && (
                    <Grid
                      item
                      xs={6}
                      md={6}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                      }}
                    >
                      {breakArray(currentCountry.footerNavigation).firstBlock.map((item, key) => {
                        return (
                          <Link key={key} href={getPathFromSlug(item?.slug?.current)} underline="hover" color="inherit">
                            <Typography variant="h5" mb={2}>{item.localeTitle[currentLanguage?.languageTag]}</Typography>
                          </Link>
                        )
                      })}
                    </Grid>
                  )
                )
              }
              {
                currentCountry.footerNavigation && (
                  breakArray(currentCountry.footerNavigation).secondBlock && (
                    <Grid
                      item
                      xs={6}
                      md={6}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                      }}
                    >
                      {breakArray(currentCountry.footerNavigation).secondBlock.map((item, key) => {
                        return (
                          <Link key={key} href={getPathFromSlug(item?.slug?.current)} underline="hover" color="inherit">
                            <Typography variant="h5" mb={2}>{item.localeTitle[currentLanguage?.languageTag]}</Typography>
                          </Link>
                        )
                      })}
                    </Grid>
                  )
                )
              }
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  mt: {
                    xs: 4,
                    md: 10
                  }
                }}
              >
                <Box mb={4}>
                  <Typography variant='h5' color='#0082E5' mb={1}>
                    {
                      currentCountry?.followUsText &&
                        currentCountry?.followUsText[currentLanguage?.languageTag] ?
                        currentCountry?.followUsText[currentLanguage?.languageTag] : ''
                    }
                  </Typography>
                  <ul className={styles.social}>
                    {currentCountry?.twitterUrl && (
                      <li><Link href={currentCountry?.twitterUrl} color="inherit" target='_blank' rel="noopener"><FaTwitter /></Link></li>
                    )}
                    {currentCountry?.linkedinUrl && (
                      <li><Link href={currentCountry?.linkedinUrl} color="inherit" target='_blank' rel="noopener"><FaLinkedinIn /></Link></li>
                    )}
                    {currentCountry?.youtubeUrl && (
                      <li><Link href={currentCountry?.youtubeUrl} color="inherit" target='_blank' rel="noopener"><FaYoutube /></Link></li>
                    )}
                  </ul>
                </Box>
                {
                  currentCountry?.footerBottomContent &&
                    currentCountry?.footerBottomContent[currentLanguage?.languageTag] ?
                    currentCountry?.footerBottomContent[currentLanguage?.languageTag].map((item) => {
                      const links = item.markDefs
                      return (
                        <Typography variant="p" sx={{ fontSize: 12 }} key={item._key}>
                          {
                            item.children.map((item) => {
                              if (item.marks[0]) {
                                const currentLink = links.find(obj => {
                                  return obj._key === item.marks[0]
                                })
                                return (
                                  <Link
                                    href={currentLink?.href}
                                    underline="hover"
                                    color="inherit"
                                  >
                                    {item.text}
                                  </Link>
                                )
                              } else {
                                return item.text
                              }
                            })
                          }
                        </Typography>
                      )
                    }) : <Typography variant="p" paragraph mb={1}>Missing - Second Left Block Content</Typography>
                }
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ marginTop: { xs: 6, md: 13 }, pl: { xs: 3, md: 8 }, pr: { xs: 3, md: 4 } }}>
            <Grid container>
              {
                currentCountry.newsletterBody && (
                  currentCountry.newsletterBody[currentLanguage?.languageTag].map((item, key) => {
                    const links = item.markDefs
                    return (
                      <Typography key={key} sx={{ color: '#fff', textDecoration: 'none', mb: 2 }} variant={item.style === 'h2' ? 'h2' : 'p'}>
                        {
                          item.children.map((item) => {
                            if (item.marks[0]) {
                              const currentLink = links.find(obj => {
                                return obj._key === item.marks[0]
                              })
                              return (
                                <Link
                                  href={currentLink?.href}
                                  color="inherit"
                                >
                                  {item.text}
                                </Link>
                              )
                            } else {
                              return item.text
                            }
                          })
                        }
                      </Typography>
                    )
                  })
                )
              }
              <Grid item xs={12} mb={2}>
                <input className={styles.inputNewsletter} placeholder="Email"></input>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ textTransform: 'inherit' }}>Subscribe</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

Footer.propTypes = {
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
}

export default withRouter(Footer)
