import React from 'react'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { Link } from 'next/router'

export default function BigButton(props) {
  const { title, route, link, sx } = props

  const buttonStyle = {
    background: 'none',
    border: '4px solid #dc6e19',
    textTransform: 'none',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      background: '#dc6e19',
    },
    ...sx
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: { slug: route.slug.current },
        }}
        as={`/${route.slug.current}`}
      >
        <Button sx={ buttonStyle }>
          {title || 'Missing title'}
        </Button>
      </Link>
    )
  }

  if (link) {
    return (
      <Button sx={ buttonStyle } onClick={() => openInNewTab(link)}>
        {title || 'Missing title'}
      </Button>
    )
  }

  return <Button
    sx={ buttonStyle }
  >{title || 'Missing title'}</Button>
}

BigButton.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
  sx: PropTypes.object,  
}
