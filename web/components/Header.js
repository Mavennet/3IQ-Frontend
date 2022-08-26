import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.css'
import SVG from 'react-inlinesvg'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from '@mui/material'
import { FaTwitter, FaLinkedinIn, FaYoutube, FaCaretDown } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import CountryAndLanguageSwitch from './CountryAndLanguageSwitch'
import { getPathFromSlug } from '../utils/urls'

function Header(props) {
  const {
    navItems,
    logo,
    setLanguage,
    dataCountries,
    currentCountry,
    currentLanguage
  } = props

  const [showNav, setShowNav] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return <></>
    }

    if (logo?.asset?.extension === 'svg') {
      return <SVG src={logo?.asset?.url} className={styles.logo} />
    }

    return (
      <Box
        component="img"
        sx={{
          maxWidth: '190px',
          mt: 3,
          mb: 3,
          ml: 4,
        }}
        alt="3iq"
        src={logo.asset.url}
      />
    )
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white', /* pb: 4 */ }}>
        <Toolbar disableGutters>
          <Box>
            <Link href={'/'} passHref>
              {renderLogo(logo)}
            </Link>
          </Box>
          <Box
            mr={{ md: 5 }}
            ml={'auto'}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ color: 'black', ml: 'auto', mb: 1, display: 'flex' }}>
              <Box sx={{ display: 'flex' }} mr={{ md: 40, xs: 8 }}>
                <button
                  className={styles.socialTwitter}
                  href={'/'}
                >
                  <FaTwitter />
                </button>
                <button
                  className={styles.socialLinkedin}
                  href={'/'}
                >
                  <FaLinkedinIn />
                </button>
                <button
                  className={styles.socialYoutube}
                  href={'/'}
                >
                  <FaYoutube />
                </button>
              </Box>
              <Box sx={{ fontSize: 24, display: { md: 'flex', xs: 'none' } }}>
                <CountryAndLanguageSwitch
                  currentCountry={currentCountry}
                  currentLanguage={currentLanguage}
                  setLanguage={setLanguage}
                  dataCountries={dataCountries}
                />
              </Box>
            </Box>
            {/* NavBar Menu - Desktop */}
            <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
              {navItems &&
                navItems.map((item) => {
                  const { slug, title, _id } = item
                  // const isActive = slugParamToPath(router.query.slug) === slug.current
                  return (
                    <Link key={_id} href={getPathFromSlug(slug.current)} passHref>
                      <Button sx={{ ml: 5, color: '#0a1b3f', display: 'block' }}>
                        {title || 'Missing'}
                      </Button>
                    </Link>
                  )
                })}
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onMouseOver={handleClick}
                sx={{ ml: 5, color: '#0a1b3f', display: 'block' }}
              >
                Dashboard
                <span className={styles.subArrow}>
                  <FaCaretDown/>
                </span>
              </Button>
              <Menu
                id="basic-menu"
                className={styles.subMenu}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  onMouseLeave: handleClose
                }}
              >
                <MenuItem onClick={handleClose}>Our Story</MenuItem>
                <MenuItem onClick={handleClose}>Our Team</MenuItem>
                <MenuItem onClick={handleClose}>Careers</MenuItem>
              </Menu>
            </Box>
            {/* NavBar Menu - Mobile */}
            <Box sx={{ml: 'auto', display: {md: 'none', xs: 'flex'}}}>
              <Box sx={{mr: 2.5}}>
                <CountryAndLanguageSwitch
                  currentCountry={currentCountry}
                  currentLanguage={currentLanguage}
                  setLanguage={setLanguage}
                  dataCountries={dataCountries}
                />
              </Box>
              <Box>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => setShowNav(!showNav)}
                >
                  <FiMenu />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={showNav}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={showNav}
                  onClose={() => setShowNav(false)}
                >
                  {navItems &&
                    navItems.map((item) => {
                      const {slug, title, _id} = item
                      // const isActive = slugParamToPath(router.query.slug) === slug.current
                      return (
                        <Link key={_id} href={getPathFromSlug(slug.current)} passHref>
                          <MenuItem>
                            <Typography textAlign="center">{title}</Typography>
                          </MenuItem>
                        </Link>
                      )
                    })}
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

Header.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string,
    }),
    events: PropTypes.any,
  }),
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
      extension: PropTypes.string,
    }),
    logo: PropTypes.string,
  }),
  dataCountries: PropTypes.array,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  setLanguage: PropTypes.object,
}

export default Header
