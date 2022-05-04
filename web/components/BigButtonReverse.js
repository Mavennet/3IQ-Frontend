import React from "react";
import Button from "@mui/material/Button";
import * as styles from "./BigButtonReverse.module.css"
import PropTypes from 'prop-types'
import {Link} from 'next/router'

export default function BigButtonReverse(props) {
  const {title, route, link, sx, styleProps} = props

  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: {slug: route.slug.current},
        }}
        as={`/${route.slug.current}`}
      >
        <Button className={styles.bigButton} sx={sx} style={styleProps}>
          {title}
        </Button>
      </Link>
    )
  }

  if (link) {
    return (
      
      <Button className={styles.bigButton} sx={sx} style={styleProps}>
        {title}
      </Button>
    )
  }

  return <Button className={styles.bigButton} sx={sx} style={styleProps}>{title || 'Missing title'}</Button>
}

BigButtonReverse.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
  sx:PropTypes.object,
  styleProps: PropTypes.object
}

