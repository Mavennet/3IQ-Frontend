import React from 'react'
import Button from '@mui/material/Button'
import * as styles from './BigButton.module.css'
import PropTypes from 'prop-types'
import {Link} from 'next/router'

export default function BigButton(props) {
  const {title, route, link} = props

  console.log(props)

  if (route && route.slug && route.slug.current) {
    console.log(1)
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: {slug: route.slug.current},
        }}
        as={`/${route.slug.current}`}
      >
        <Button className={styles.bigButton} sx={props.sx} style={props.style}>
          {title}
        </Button>
      </Link>
    )
  }

  if (link) {
    console.log(2)
    return (
      
      <Button className={styles.bigButton} sx={props.sx} style={props.style}>
        {title}
      </Button>
    )
  }

  return <Button className={styles.bigButton} sx={props.sx} style={props.style}>{title}</Button>
}

BigButton.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
}
