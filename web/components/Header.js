import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import styles from './Header.module.css'
import HamburgerIcon from './icons/Hamburger'
import {getPathFromSlug, slugParamToPath} from '../utils/urls'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import {FiMenu} from 'react-icons/fi'

class Header extends Component {
  state = {showNav: false}

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
    title: PropTypes.string,
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
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={logo.asset.url} className={styles.logo} />
    }

    return (
      <Box
        component="img"
        sx={{
          maxWidth: '14%',
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
    const {title = 'Missing title', navItems, router, logo} = this.props
    const {showNav} = this.state

    return (
      <AppBar position="static" sx={{bgcolor: 'white', pb: 4}}>
        <Toolbar disableGutters>
          <Link href={'/'}>{this.renderLogo(logo)}</Link>

          <Box sx={{ml: 'auto', mr: 10, display: {xs: 'none', md: 'flex'}}}>
            tw lin yt
            {navItems &&
              navItems.map((item) => {
                const {slug, title, _id} = item
                const isActive = slugParamToPath(router.query.slug) === slug.current
                return (
                  <Link href={getPathFromSlug(slug.current)}>
                    <Button key={_id} sx={{ml: 5, color: '#0a1b3f', display: 'block'}}>
                      {title}
                    </Button>
                  </Link>
                )
              })}
          </Box>

          <Box sx={{ml: 'auto', display: {md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenuToggle}
            >
              <FiMenu />
            </IconButton>
            <Menu
              sx={{mt: '45px'}}
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
                  const isActive = slugParamToPath(router.query.slug) === slug.current
                  return (
                    <Link href={getPathFromSlug(slug.current)}>
                      <MenuItem key={_id}>
                        <Typography textAlign="center">{title}</Typography>
                      </MenuItem>
                    </Link>
                  )
                })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(Header)
