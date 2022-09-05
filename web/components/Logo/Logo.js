import React from "react"
import { Box } from "@mui/material"
import styles from './Logo.module.css'
import SVG from 'react-inlinesvg'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function Logo (props) {
  const { logo } = props

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
      alt={logo.alt}
      className={styles.logo}
      src={urlFor(logo.asset._ref).url()}
    />
  )
}

Logo.propTypes = {
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
      extension: PropTypes.string,
    }),
    logo: PropTypes.string,
  }),
}

export default Logo
