import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'
import styles from './NavLink.module.css'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {Link} from '@mui/material'

class NavLink extends Component {
  state = {
    showNav: false,
  }

  handleCountryMenuToggle = () => {
    const {showCountryNav} = this.state
    this.setState({
      showCountryNav: !showCountryNav,
    })
  }

  hideCountryMenu = () => {
    this.setState({showCountryNav: false})
  }

  static propTypes = {
    id: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
  }

  renderLanguageSelect(currentCountry, currentLanguage, setLanguage) {
    const {showLanguageNav} = this.state

    if (currentCountry.languages.length <= 1) return <></>

    return (
      <>
        <button onClick={this.handleLanguageMenuToggle} className={styles.countryButtons}>
          {currentLanguage.name || currentCountry.languages[0].name}
        </button>
        <Menu
          id="menu-appbar"
          anchorEl={showLanguageNav}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={showLanguageNav}
          onClose={this.handleLanguageMenuToggle}
        >
          {currentCountry &&
            currentCountry.languages.map((language) => {
              return (
                <MenuItem key={language._id} onClick={(e) => setLanguage(language)}>
                  <Typography textAlign="center">{language.name}</Typography>
                </MenuItem>
              )
            })}
        </Menu>
      </>
    )
  }

  render() {
    const {id, href, title} = this.props

    return (
      <Link key={id} href={href} passHref>
        <button  className={styles.link}>{title || 'Missing'}</button>
      </Link>
    )
  }
}

export default withRouter(NavLink)
