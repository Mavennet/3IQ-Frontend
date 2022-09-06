import React from "react"
import PropTypes from 'prop-types'
import { FaGlobe } from 'react-icons/fa'
import SelectDropdown from "./SelectDropdown/SelectDropdown"

function CountryAndLanguageSwitch(props) {
  const { dataCountries, currentLanguage, currentCountry, setLanguage } = props
  return (
    <>
      {/* Icon Menu */}
      <FaGlobe style={{ fontSize: 20, color: 'black', marginRight: 7 }} />
      {/* Country Menu */}
      <SelectDropdown
        dataCountries={dataCountries}
        setLanguage={setLanguage}
        title={currentCountry.name}
        flag={currentCountry.urlTag.toUpperCase()}
      />
      {/* Language Menu */}
      <SelectDropdown
        currentCountry={currentCountry}
        setLanguage={setLanguage}
        title={currentLanguage.name || currentCountry.languages[0].name}
      />
    </>
  )
}

CountryAndLanguageSwitch.propTypes = {
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
  setLanguage: PropTypes.func,
}

export default CountryAndLanguageSwitch
