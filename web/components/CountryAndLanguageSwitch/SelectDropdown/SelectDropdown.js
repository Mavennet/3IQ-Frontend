import React from 'react'
import PropTypes from 'prop-types'
import {Menu, MenuItem, Typography, Link, Box} from '@mui/material'
import styles from '../CountryAndLanguageSwitch.module.css'
import ReactCountryFlag from 'react-country-flag'
import {FaGlobe} from 'react-icons/fa'


function SelectDropdown(props) {
  const {title, flag, currentCountry, dataCountries, setLanguage} = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <button onClick={handleOpen} className={styles.countryButtons}>
        {flag ? (
          <Box sx={{display: 'flex'}}>
            <FaGlobe style={{fontSize: 20, marginRight: 10, color: 'black'}} />
            <ReactCountryFlag
              countryCode={flag}
              title={title}
              svg
              style={{
                width: '1.5em',
                height: '1.5em',
              }}
            />
          </Box>
        ) : (
          title
        )}
      </button>
      <Menu
        id="languageMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
      >
        {dataCountries &&
          dataCountries.map((country) => {
            return (
              <Link
                key={country.urlTag}
                href={
                  country.urlTag === 'au'
                    ? 'https://3iq-au.com/'
                    : `/${country.urlTag}/home`
                }
                underline="hover"
                color="inherit"
              >
                <MenuItem>
                  <ReactCountryFlag countryCode={country.urlTag.toUpperCase()} svg />
                  <Typography textAlign="center" sx={{ml: 1}}>
                    {country.name}
                  </Typography>
                </MenuItem>
              </Link>
            )
          })}
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

SelectDropdown.propTypes = {
  title: PropTypes.string,
  flag: PropTypes.string,
  dataCountries: PropTypes.array,
  currentCountry: PropTypes.object,
  setLanguage: PropTypes.func,
}

export default SelectDropdown
