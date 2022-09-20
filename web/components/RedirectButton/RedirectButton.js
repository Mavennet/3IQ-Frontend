import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@mui/material/Button'

function redirectButton(props) {
  const {title, route, link, sx, reverse = false, className} = props

  const buttonStyle = {
    fontFamily: 'Europa',
    background: 'none',
    border: '3px solid #dc6e19',
    textTransform: 'none',
    whiteSpace: 'normal',
    display: 'block',
    wordWrap: 'break-word',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: '#dc6e19',
    },
    ...sx,
  }

  const buttonReverseStyle = {
    fontFamily: 'Europa',
    background: '#dc6e19',
    border: '3px solid #dc6e19',
    textTransform: 'none',
    whiteSpace: 'normal',
    display: 'block',
    wordWrap: 'break-word',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: 'none',
      color: '#dc6e19',
    },
    ...sx,
  }

  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: {slug: route.slug.current},
        }}
        as={`/${route.slug.current}`}
      >
        <Button className={className} sx={reverse ? buttonStyle : buttonReverseStyle}>{title || 'Missing title'}</Button>
      </Link>
    )
  }

  if (link) {
    return (
      <a href={link} style={{textDecoration: 'none'}}>
        <Button className={className} sx={reverse ? buttonStyle : buttonReverseStyle}>{title || 'Missing title'}</Button>
      </a>
    )
  }

  return <Button className={className} sx={reverse ? buttonStyle : buttonReverseStyle}>{title || 'Missing title'}</Button>
}

redirectButton.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  className: PropTypes.object,
  link: PropTypes.string,
}

export default redirectButton
