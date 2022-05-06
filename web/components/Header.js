import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import styles from './Header.module.css'
import {
  getPathFromSlug,
  // slugParamToPath
} from '../utils/urls'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import {FiMenu} from 'react-icons/fi'
import {FaGlobe, FaTwitter, FaLinkedinIn, FaYoutube} from 'react-icons/fa'

class Header extends Component {
  state = {showNav: false, languages: ['EN', 'FR']}

  hideMenu = () => {
    this.setState({showNav: false})
  }

  handleMenuToggle = () => {
    const {showNav} = this.state
    this.setState({
      showNav: !showNav,
    })
  }

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.string,
      }),
      events: PropTypes.any,
    }),
    // title: PropTypes.string,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
      logo: PropTypes.string,
    }),
  }

  componentDidMount() {
    const {router} = this.props
    router.events.on('routeChangeComplete', this.hideMenu)
  }

  componentWillUnmount() {
    const {router} = this.props
    router.events.off('routeChangeComplete', this.hideMenu)
  }

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return <></>
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={logo.asset.url} className={styles.logo} />
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

  render() {
    const {
      // title = 'Missing title',
      navItems,
      // router,
      logo,
    } = this.props
    const {showNav} = this.state

    return (
      <AppBar position="static" sx={{bgcolor: 'white', pb: 4}}>
        <Toolbar disableGutters>
          <Box>
            <Link href={'/'} passHref>
              {this.renderLogo(logo)}
            </Link>
          </Box>
          <Box
            mr={{md: 5}}
            ml={'auto'}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{color: 'black', ml: 'auto', mb: 1, display: 'flex'}}>
              <Box sx={{ display: 'flex'}} mr={{md: 40, xs: 8}}>
                <button
                  href={'/'}
                  style={{
                    fontSize: 16,
                    borderRadius: '200px',
                    border: 'none',
                    padding: '5px 7px',
                    background: 'none',
                    color: '#0082e5',
                  }}
                >
                  <FaTwitter />
                </button>
                <button
                  href={'/'}
                  style={{
                    fontSize: 16,
                    borderRadius: '200px',
                    border: 'none',
                    padding: '5px 7px',
                    background: 'none',
                    color: '#0082e5',
                  }}
                >
                  <FaLinkedinIn />
                </button>
                <button
                  href={'/'}
                  style={{
                    fontSize: 16,
                    borderRadius: '200px',
                    border: 'none',
                    padding: '5px 7px',
                    background: 'none',
                    color: '#0082e5',
                  }}
                >
                  <FaYoutube />
                </button>
              </Box>
              <Box sx={{fontSize: 24, display: {md: 'flex', xs: 'none'}}}>
                <FaGlobe style={{marginRight: 10}} />
                {this.state.languages &&
                  this.state.languages.map((lang) => {
                    return (
                      <button key={lang} className={styles.countryButtons}>
                        {lang}
                      </button>
                    )
                  })}
              </Box>
            </Box>
            <Box sx={{ml: 'auto', display: {xs: 'none', md: 'flex'}}}>
              {navItems &&
                navItems.map((item) => {
                  console.log(item)
                  const {slug, title, _id} = item
                  // const isActive = slugParamToPath(router.query.slug) === slug.current
                  return (
                    <Link key={_id} href={getPathFromSlug(slug.current)} passHref>
                      <Button sx={{ml: 5, color: '#0a1b3f', display: 'block'}}>
                        {title || 'Missing'}
                      </Button>
                    </Link>
                  )
                })}
            </Box>
            <Box sx={{ml: 'auto', display: {md: 'none', xs: 'flex'}}}>
              <Box sx={{mr: 2.5}}>
                <FaGlobe style={{marginRight: 10, fontSize: 20, color: 'black'}} />
                {this.state.languages &&
                  this.state.languages.map((lang) => {
                    return (
                      <button key={lang} className={styles.countryButtons}>
                        {lang}
                      </button>
                    )
                  })}
              </Box>
              <Box>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenuToggle}
                >
                  <FiMenu  />
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
                  onClose={this.handleMenuToggle}
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
    )
  }
}

export default withRouter(Header)
