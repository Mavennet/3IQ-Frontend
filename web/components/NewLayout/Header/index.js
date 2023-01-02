import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {AppBar, Toolbar, Box, IconButton, Link, Container} from '@mui/material'
import Logo from '../Logo'
import Social from './Social'
import NavItem from './NavItem'
import NavItemDropdown from './NavItemDropdown'
import {FiMenu} from 'react-icons/fi'
import {IoMdClose} from 'react-icons/io'
import CountryAndLanguageSwitch from '../CountryAndLanguageSwitch'

function Header(props) {
  const {navItems, setLanguage, dataCountries, currentCountry, currentLanguage} = props

  const [showNav, setShowNav] = React.useState(false)
  const [logoLanguage, setLogoLanguage] = React.useState(null)
  const size = useWindowSize()

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      setLogoLanguage(currentLanguage.languageTag)
    }
    setShowNav(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage.languageTag, size])

  return (
    <>
      {showNav && (
        <Box ml={'auto'} className={styles.navbarContainer}>
          <div className={styles.menuMobile}>
            <Box className={styles.closeIcon}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setShowNav(!showNav)}
              >
                <IoMdClose />
              </IconButton>
            </Box>

            <Box pl={4} pt={3} pb={3}>
              <Logo
                logo={
                  currentCountry.headerLogo[logoLanguage] && currentCountry.headerLogo[logoLanguage]
                }
              />
            </Box>
            <Box pl={2}>
              <ul>
                {navItems &&
                  navItems.map((item) =>
                    item.submenuRoutes && item.submenuRoutes.length > 0 ? (
                      <NavItemDropdown
                        title={item.route?.localeTitle[currentLanguage.languageTag]}
                        _id={item.id}
                        submenuRoutes={item.submenuRoutes}
                        language={currentLanguage.languageTag}
                        key={item._id}
                        link={item.route.slug.current}
                        isLinkEnabled={item.isLinkEnabled}
                      />
                    ) : (
                      <NavItem
                        title={item.route?.localeTitle[currentLanguage.languageTag]}
                        _id={item.id}
                        route={item.route}
                        key={item._id}
                        isLinkEnabled={item.isLinkEnabled}
                      />
                    )
                  )}
              </ul>
            </Box>
            <Box
              sx={{
                mt: 3,
                ml: 3,
                mb: 10,
                alignItems: 'center',
                display: {xs: 'flex', sm: 'none', md: 'none'},
              }}
            >
               <Social
                youtubeUrl={currentCountry.youtubeUrl}
                linkedinUrl={currentCountry.linkedinUrl}
                twitterUrl={currentCountry.twitterUrl}
              />
            </Box>
          </div>
        </Box>
      )}
      <AppBar position="static" sx={{bgcolor: '#F9F9F9', boxShadow: 'none'}}>
        <Container maxWidth={'lg'}>
          <Toolbar disableGutters>
            {logoLanguage && (
              <Box>
                {/* Logo */}
                <Link href={`/${currentCountry.urlTag}/home`}>
                  <Logo
                    logo={
                      currentCountry.headerLogo[logoLanguage] &&
                      currentCountry.headerLogo[logoLanguage]
                    }
                  />
                </Link>
              </Box>
            )}
            <Box ml={'auto'} className={styles.navbarContainer}>
              <Box sx={{color: 'black', display: 'flex', justifyContent: 'end'}}>
                {/* Social Networks */}
                {/* <Social
                youtubeUrl={currentCountry.youtubeUrl}
                linkedinUrl={currentCountry.linkedinUrl}
                twitterUrl={currentCountry.twitterUrl}
              /> */}
                {/* Language Selector */}
                <Box
                  sx={{
                    fontSize: 24,
                    alignItems: 'center',
                    display: {xs: 'none', sm: 'flex', md: 'flex'},
                  }}
                ></Box>
              </Box>
              {/* NavBar Menu - Desktop */}
              <Box sx={{ml: 'auto', display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'}}}>
                {navItems &&
                  navItems.map(
                    (item) =>
                      item &&
                      (item.submenuRoutes && item.submenuRoutes.length > 0 ? (
                        <NavItemDropdown
                          title={item.route?.localeTitle[currentLanguage.languageTag]}
                          _id={item.id}
                          submenuRoutes={item.submenuRoutes}
                          language={currentLanguage.languageTag}
                          key={item._id}
                          link={item.route.slug.current}
                          isLinkEnabled={item.isLinkEnabled}
                        />
                      ) : (
                        <NavItem
                          title={item.route?.localeTitle[currentLanguage.languageTag]}
                          _id={item.id}
                          route={item.route}
                          key={item._id}
                          isLinkEnabled={item.isLinkEnabled}
                        />
                      ))
                  )}
                <span className={styles.separator}>|</span>
                <CountryAndLanguageSwitch
                  currentCountry={currentCountry}
                  currentLanguage={currentLanguage}
                  setLanguage={setLanguage}
                  dataCountries={dataCountries}
                />
              </Box>
              {/* NavBar Menu - Mobile */}
              <Box
                justifyContent="flex-end"
                sx={{mb: '20px', display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none'}}}
              >
                <Box
                  sx={{
                    mr: 2.5,
                    alignItems: 'center',
                    display: {xs: 'flex', sm: 'none', md: 'none'},
                  }}
                >
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
                    <FiMenu className={styles.icon} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
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
      slug: PropTypes.shape({
        current: PropTypes.string,
        _type: PropTypes.string,
      }),
    })
  ),
  dataCountries: PropTypes.array,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  setLanguage: PropTypes.func,
}

export default Header
