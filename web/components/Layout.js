import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { LogoJsonLd } from 'next-seo'
import Header from './NewLayout/Header'
import Footer from './NewLayout/Footer'

function Layout(props) {
  const { config, children, pageType } = props

  if (!config) {
    console.error('Missing config')
    return <div>Missing config</div>
  }

  const {
    title,
    // mainNavigation,
    logo,
    url,
    switchLanguage,
    dataCountries,
    currentCountry,
    currentLanguage
  } = config


  const logoUrl = logo && logo.asset && logo.asset.url

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, viewport-fit=cover" />
      </Head>
      <div className="container">
        <Header
          title={title}
          navItems={currentCountry.mainNavigation}
          logo={logo}
          setLanguage={switchLanguage}
          dataCountries={dataCountries}
          currentCountry={currentCountry}
          currentLanguage={currentLanguage}
          pageType={pageType}
        />
        <div className="content">{children}</div>
        <Footer
          dataCountries={dataCountries}
          currentCountry={currentCountry}
          currentLanguage={currentLanguage}
        />
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.shape({
    title: PropTypes.string,
    switchLanguage: PropTypes.func,
    mainNavigation: PropTypes.arrayOf(PropTypes.object),
    footerNavigation: PropTypes.arrayOf(PropTypes.object),
    footerText: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    url: PropTypes.string,
    dataCountries: PropTypes.array,
    currentLanguage: PropTypes.object,
    currentCountry: PropTypes.object,
  }),
}

export default Layout
