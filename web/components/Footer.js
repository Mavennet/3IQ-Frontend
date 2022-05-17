import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'
import styles from './Footer.module.css'
// import SimpleBlockContent from './SimpleBlockContent' // no-unused-vars
// import {getPathFromSlug, slugParamToPath} from '../utils/urls' // no-unused-vars
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Link} from '@mui/material'
import SVG from 'react-inlinesvg'

const theme = createTheme()

function renderLogo(logo) {
  if (!logo || !logo.asset) {
    return (
      <Box
        component="img"
        sx={{
          maxWidth: '190px',
          mb: 3,
          ml: 4,
        }}
        alt="3iq"
        src={'https://3iq.ca/wp-content/uploads/2022/01/3iQ-digital-asset-management-white.png'}
      />
    )
  }

  if (logo.asset.extension === 'svg') {
    return <SVG src={logo.asset.url} className={styles.logo} />
  }

  return (
    <Box
      component="img"
      sx={{
        maxWidth: '190px',
        mb: 3,
        ml: 4,
      }}
      alt="3iq"
      src={'https://3iq.ca/wp-content/uploads/2022/01/3iQ-digital-asset-management-white.png'}
    />
  )
}

function Footer(props) {
  const {navItems, text, router} = props
  console.log(navItems, text, router) // no-unused-vars

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
        <Grid sm={3} xs={12}>
          {renderLogo()}
          <Box pl={4} pr={4}>
            <Typography variant="p" paragraph>
              1020 – 181 Bay Street, Box 760 Toronto, Ontario Canada M5J 2T3
            </Typography>

            <Typography variant="p" paragraph>
              +1 416 – 639 – 2130
            </Typography>

            <Typography variant="p" paragraph>
              info@3iq.ca
            </Typography>

            <Typography variant="p" paragraph>
              Monday to Friday 9:00AM – 5:00PM EST
            </Typography>
          </Box>
        </Grid>
        <Grid
          sm={6}
          xs={12}
          sx={{borderLeft: '8px solid #0082e5', display: {md: 'flex', xs: 'none'}}}
        >
          <Box pl={4} pr={4} mt={12}>
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Our Funds</Typography>
                </Link>
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Our Story</Typography>
                </Link>
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Our Team</Typography>
                </Link>
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Careers</Typography>
                </Link>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">3iQ in the News</Typography>
                </Link>
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Crypto 101</Typography>
                </Link>
                <Link sx={{color: '#fff', m: 1, textDecoration: 'none'}}>
                  <Typography variant="h5">Contact Us</Typography>
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Typography variant="p" sx={{fontSize: 14, mt: 20}}>
                  © 2022 3iQ Corp. Disclaimer | Privacy Policy | Cookies Policy | Legal, Financial &
                  Regulatory
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid sm={3} xs={12}>
          <Box pl={4} pr={4} mt={13}>
            <Typography sx={{color: '#fff', textDecoration: 'none', mb: 2}} variant="h5">
              Newsletter
            </Typography>
            <Typography variant="p" sx={{fontSize: 14, mt: 20}}>
              Stay up to date on the latest from 3iQ
            </Typography>
            <Box sx={{mt: 2, mb: 2}}>
            <input placeholder="Email" style={{padding: 12}}></input>
            </Box>
          
            <Typography variant="p" sx={{fontSize: 14, mt: 20}}>
              We don't sell or rent your information. Please refer to the 3iQ privacy policy or
              contact us for more information.
            </Typography>
            <Box sx={{mt: 2, ml: 14}}>
              <button className={styles.subscribeButton}>Subscribe</button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

Footer.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  text: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
}

export default withRouter(Footer)
