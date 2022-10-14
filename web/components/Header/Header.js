import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.css'
import { AppBar, Toolbar, Box, IconButton, Link } from '@mui/material'
import Logo from '../Logo/Logo'
import Social from './Social/Social'
import NavItem from './NavItem/NavItem'
import NavItemDropdown from './NavItemDropdown/NavItemDropdown'
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import CountryAndLanguageSwitch from '../CountryAndLanguageSwitch/CountryAndLanguageSwitch'
function Header(props) {
  const {
    navItems,
    setLanguage,
    dataCountries,
    currentCountry,
    currentLanguage
  } = props

  const [showNav, setShowNav] = React.useState(false)
  const [logoLanguage, setLogoLanguage] = React.useState(null)

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      setLogoLanguage(currentLanguage.languageTag)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage.languageTag])

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Toolbar
          disableGutters
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' }
          }}
        >
          {
            logoLanguage && (
              <Box>
                {/* Logo */}
                <Link href={`/${currentCountry.urlTag}/home`}>
                  <Logo logo={currentCountry.headerLogo[logoLanguage] && currentCountry.headerLogo[logoLanguage]} />
                </Link>
              </Box>
            )
          }
          <Box
            mt={{ xs: 0, md: 1 }}
            mr={{ xs: 1, md: 3, lg: '5%' }}
            ml={'auto'}
            className={styles.navbarContainer}
          >
            <Box
              mb={{ xs: 1, md: 2 }}
              sx={{ color: 'black', display: 'flex', justifyContent: 'space-between' }}
            >
              {/* Social Networks */}
              <Social
                youtubeUrl={currentCountry.youtubeUrl}
                linkedinUrl={currentCountry.linkedinUrl}
                twitterUrl={currentCountry.twitterUrl}
              />
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
            <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
              {navItems &&
                navItems.map((item) => (
                  item && (
                    item.submenuRoutes &&
                      item.submenuRoutes.length > 0
                      ? (
                        <NavItemDropdown
                          title={item.route?.localeTitle[currentLanguage.languageTag]}
                          _id={item.id}
                          submenuRoutes={item.submenuRoutes}
                          language={currentLanguage.languageTag}
                          key={item._id}
                          link={item.route.slug.current}
                          isLinkEnabled={item.isLinkEnabled}
                        />
                      )
                      : (
                        <NavItem
                          title={item.route?.localeTitle[currentLanguage.languageTag]}
                          _id={item.id}
                          route={item.route}
                          key={item._id}
                          isLinkEnabled={item.isLinkEnabled}
                        />
                      )
                  )))}
            </Box>
            {/* NavBar Menu - Mobile */}
            <Box
              justifyContent='flex-end'
              sx={{ mb: '20px', display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' } }}
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
                            item.submenuRoutes &&
                              item.submenuRoutes.length > 0
                              ? (
                                <NavItemDropdown
                                  title={item.route?.localeTitle[currentLanguage.languageTag]}
                                  _id={item.id}
                                  submenuRoutes={item.submenuRoutes}
                                  language={currentLanguage.languageTag}
                                  key={item._id}
                                  link={item.route.slug.current}
                                  isLinkEnabled={item.isLinkEnabled}
                                />
                              )
                              : (
                                <NavItem
                                  title={item.route?.localeTitle[currentLanguage.languageTag]}
                                  _id={item.id}
                                  route={item.route}
                                  key={item._id}
                                  isLinkEnabled={item.isLinkEnabled}
                                />
                              )
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
  dataCountries: PropTypes.array,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  setLanguage: PropTypes.func,
}

export default Header
