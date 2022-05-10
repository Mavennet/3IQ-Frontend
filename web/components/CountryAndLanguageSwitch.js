import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'
import styles from './CountryAndLanguageSwitch.module.css'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {FaGlobe} from 'react-icons/fa'
import {Link} from '@mui/material'

class CountryAndLanguageSwitch extends Component {
  state = {
    showCountryNav: false,
    showLanguageNav: false,
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

  handleLanguageMenuToggle = () => {
    const {showLanguageNav} = this.state
    this.setState({
      showLanguageNav: !showLanguageNav,
    })
  }

  hideLanguageMenu = () => {
    this.setState({showLanguageNav: false})
  }

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.string,
      }),
      events: PropTypes.any,
    }),
    dataCountries: PropTypes.array,
    currentLanguage: PropTypes.object,
    currentCountry: PropTypes.object,
    setLanguage: PropTypes.object,
  }

  renderLanguageSelect(currentCountry, currentLanguage, setLanguage) {
    const {showLanguageNav} = this.state

    if (currentCountry.languages.length <= 1)
      return <></>

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

  renderCountrySelect(dataCountries, currentCountry) {
    const {showCountryNav} = this.state

    if (dataCountries.length <= 1)
      return <></>

    return (
      <>
        <button onClick={this.handleCountryMenuToggle} className={styles.countryButtons}>
          {currentCountry.urlTag.toUpperCase()}
        </button>

        <Menu
          id="menu-appbar"
          anchorEl={showCountryNav}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={showCountryNav}
          onClose={this.handleCountryMenuToggle}
        >
          {dataCountries &&
            dataCountries.map((country) => {
              return (
                <Link key={country.urlTag} href={`/${country.urlTag}/home`}>
                  <MenuItem>
                    <Typography textAlign="center">{country.urlTag.toUpperCase()}</Typography>
                  </MenuItem>
                </Link>
              )
            })}
        </Menu>
      </>
    )
  }

  render() {
    const {dataCountries, currentLanguage, currentCountry, setLanguage} = this.props

    return (
      <>
        <FaGlobe style={{marginRight: 10, fontSize: 20, color: 'black', marginTop: 6}} />
        {this.renderCountrySelect(dataCountries, currentCountry)}
        {this.renderLanguageSelect(currentCountry, currentLanguage, setLanguage)}
      </>
    )
  }
}

export default withRouter(CountryAndLanguageSwitch)
