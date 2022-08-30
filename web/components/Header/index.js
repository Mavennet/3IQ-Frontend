import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.css'
import SVG from 'react-inlinesvg'
import { AppBar, Toolbar, Box, IconButton, Link } from '@mui/material'
import Social from './Social'
import NavItem from './NavItem'
import NavItemDropdown from './NavItemDropdown'
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import CountryAndLanguageSwitch from '../CountryAndLanguageSwitch'
function Header(props) {
  const {
    navItems,
    logo,
    setLanguage,
    dataCountries,
    currentCountry,
    currentLanguage
  } = props

  const [showNav, setShowNav] = React.useState(false)

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
          mt: 3,
          mb: 3,
          ml: 4,
        }}
        alt="3iq"
        className={styles.logo}
        src={logo.asset.url}
      />
    )
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white', /* pb: 4 */ }}>
        <Toolbar
          disableGutters
          className={styles.container}
        >
          <Box>
            {/* Logo */}
            <Link href={'/'}>
              {renderLogo(logo)}
            </Link>
          </Box>
          <Box
            mr={{ md: 5 }}
            ml={'auto'}
            className={styles.navbarContainer}
          >
            <Box sx={{ color: 'black', ml: 'auto', display: 'flex' }}>
              {/* Social Networks */}
              <Social />
              {/* Language Selector */}
              <Box sx={{ fontSize: 24, alignItems: 'center', display: { xs: 'none', sm: 'flex', md: 'flex' } }}>
                <CountryAndLanguageSwitch
                  currentCountry={currentCountry}
                  currentLanguage={currentLanguage}
                  setLanguage={setLanguage}
                  dataCountries={dataCountries}
                />
              </Box>
            </Box>
            {/* NavBar Menu - Desktop */}
            <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              {navItems &&
                navItems.map((item) => (
                  item.submenuRoutes.length > 0
                    ? (<NavItemDropdown
                      name={item.name}
                      _id={item.id}
                      submenuRoutes={item.submenuRoutes}
                      language={currentLanguage.languageTag}
                      key={item._id}
                      link={item.link}
                    />)
                    : (<NavItem
                      name={item.name}
                      _id={item.id}
                      routes={item.route}
                      key={item._id}
                    />)
                ))}
            </Box>
            {/* NavBar Menu - Mobile */}
            <Box
              justifyContent='flex-end'
              sx={{ mb: '20px', display: { xs: 'flex', sm: 'flex', md: 'none' } }}
            >
              <Box sx={{ mr: 2.5, alignItems: 'center', display: { xs: 'flex', sm: 'none', md: 'none' } }}>
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
                  {
                    showNav ? <IoMdClose color={'#DC6E19'} /> : <FiMenu color={'#156dff'} />
                  }
                </IconButton>
                {
                  showNav && (
                    <div className={styles.menuMobile}>
                      <ul>
                        {navItems &&
                          navItems.map((item) => (
                            item.submenuRoutes.length > 0
                              ? (<NavItemDropdown
                                name={item.name}
                                _id={item.id}
                                submenuRoutes={item.submenuRoutes}
                                language={currentLanguage.languageTag}
                                key={item._id}
                                link={item.link}
                              />)
                              : (<NavItem name={item.name}
                                _id={item.id}
                                routes={item.route}
                                key={item._id}
                              />)
                          ))}
                      </ul>
                    </div>
                  )
                }
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
      name: PropTypes.string.isRequired,
      slug: PropTypes.shape(
        {
          current: PropTypes.string,
          _type: PropTypes.string
        }
      ),
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
  setLanguage: PropTypes.func,
}

export default Header
