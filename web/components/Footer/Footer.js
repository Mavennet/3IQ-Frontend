import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Box, Typography, Button, CssBaseline, Link } from '@mui/material'
import Logo from '../Logo/Logo'
import Image from 'next/image'
import { FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import icon2 from '../../assets/img/footer/icon-2.png'
import styles from './Footer.module.css'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
})

const logo = {
  asset: {
    url: 'https://3iq.ca/wp-content/uploads/2022/01/3iQ-digital-asset-management-white.png',
    extension: 'png'
  },
  logo: 'https://3iq.ca/wp-content/uploads/2022/01/3iQ-digital-asset-management-white.png',
}

function Footer(props) {

  const {
    dataCountries,
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
              logo ?
                <Link href={'/'}>
                  <Logo logo={logo} />
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
                      width={100}
                      height={100}
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
                                let currentLink = links.find(obj => {
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
                <Image
                  src={icon2.src}
                  width={90}
                  height={90}
                  alt={'Voxels Logo'}
                />
              </Grid>
              <Grid item xs={9} pl={2}>
                <Link
                  href={'https://www.cryptovoxels.com/play?coords=S@203W,469N'}
                  underline="hover"
                  color="inherit"
                  target='_blank'
                  rel="noopener"
                >
                  <Typography variant="p" paragraph mb={1}>
                    3iQ Metaverse HQ
                  </Typography>
                </Link>
                <Link
                  href={'https://www.cryptovoxels.com/play?coords=S@203W,469N'}
                  underline="hover"
                  color="inherit"
                  target='_blank'
                  rel="noopener"
                >
                  <Typography variant="p" paragraph mb={1}>
                    2 Turing Expressway
                  </Typography>
                </Link>
                <Typography variant="p" paragraph mb={2}>
                  Rome, Origin City
                </Typography>
                <Link
                  href={'https://www.cryptovoxels.com/play?coords=S@203W,469N'}
                  underline="hover"
                  color="inherit"
                  target='_blank'
                  rel="noopener"
                >
                  <Button variant="contained" sx={{ textTransform: 'inherit' }}>Visit us on Voxels</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ pl: { xs: 3, md: 8 }, pr: { xs: 3, md: 0 } }}>
            <Grid container>
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
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Our Funds</Typography>
                </Link>
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Our Story</Typography>
                </Link>
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Our Team</Typography>
                </Link>
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Careers</Typography>
                </Link>
              </Grid>
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
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>3iQ in the News</Typography>
                </Link>
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Crypto 101</Typography>
                </Link>
                <Link href={'#'} underline="hover" color="inherit">
                  <Typography variant="h5" mb={2}>Contact Us</Typography>
                </Link>
              </Grid>
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
                    <li><Link href="#" color="inherit"><FaTwitter /></Link></li>
                    <li><Link href="#" color="inherit"><FaLinkedinIn /></Link></li>
                    <li><Link href="#" c color="inherit"><FaYoutube /></Link></li>
                  </ul>
                </Box>
                <Typography variant="p" sx={{ fontSize: 12 }}>
                  © 2022 3iQ Corp. Disclaimer | <Link href={'#'} underline="hover" color="inherit">Privacy Policy</Link> | <Link href={'#'} underline="hover" color="inherit">Cookies Policy</Link> | <Link href={'#'} underline="hover" color="inherit">Legal, Financial & Regulatory</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ marginTop: { xs: 6, md: 13 }, pl: { xs: 3, md: 8 }, pr: { xs: 3, md: 4 } }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ color: '#fff', textDecoration: 'none', mb: 2 }} variant="h5">
                  Newsletter
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="p" paragraph sx={{ fontSize: 12 }}>
                  Stay up to date on the latest from 3iQ
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <input className={styles.inputNewsletter} placeholder="Email"></input>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="p" paragraph sx={{ fontSize: 12 }}>We dont sell or rent your information. Please refer to the 3iQ <Link href="#">privacy policy</Link> or contact us for more information.
                </Typography>
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
  dataCountries: PropTypes.array,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
}

export default withRouter(Footer)
