import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'

function Button(props) {
  const {
    title,
    variant = 'solid',
    size = 'md',
    disabled = false,
    arrow = false,
    route,
    link,
    target,
    className
  } = props

  const typesStyle = {
    solid: styles.button__solid,
    solidWhite: styles.button__solid__white,
    solidOrange: styles.button__solid__orange,
    outlined: styles.button__outlined,
    outlinedWhite: styles.button__outlined__white,
  }

  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: '/LandingPage',
          query: { slug: route.slug.current },
        }}
        as={`/${route.slug.current}`}
      >
        <a>
          <button
            className={`${styles.button} ${typesStyle[variant]} ${size} ${className}`}
            disabled={disabled}
          >
            <div className={styles.button__title}>{title}</div>
            {arrow && (<FiChevronDown className={styles.arrow} />)}
          </button>
        </a>
      </Link>
    )
  }

  if (link) {
    return (
      <a href={link} target={target}>
        <button
          className={`${styles.button} ${typesStyle[variant]} ${size} ${className}`}
          disabled={disabled}
        >
          <div className={styles.button__title}>{title}</div>
          {arrow && (<FiChevronDown className={styles.arrow} />)}
        </button>
      </a>
    )
  }

  return (
    <button
      className={`${styles.button} ${typesStyle[variant]} ${size} ${className}`}
      disabled={disabled}
    >
      <div className={styles.button__title}>{title}</div>
      {arrow && (<FiChevronDown className={styles.arrow} />)}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.boolean,
  arrow: PropTypes.boolean,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.string
}

export default Button
