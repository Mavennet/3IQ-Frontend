import React from 'react'
import BaseApp from 'next/app'
import client from '../client'
// import '../styles/global.scss'
import '../styles/shared.module.css'
import '../styles/layout.css'
import '../styles/custom-properties.css'
import { SITE_CONFIG_QUERY } from '../utils/groqQueries'

class App extends BaseApp {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Add site config from sanity
    return client.fetch(SITE_CONFIG_QUERY).then((config) => {
      if (!config) {
        return {pageProps}
      }
      if (config && pageProps) {
        pageProps.config = config
      }

      return {pageProps}
    })
  }

  render() {
    const {Component, pageProps} = this.props
    return <Component {...pageProps} />
  }
}

export default App
