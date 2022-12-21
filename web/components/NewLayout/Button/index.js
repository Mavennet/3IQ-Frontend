import React from 'react'
import {PropTypes} from 'prop-types'
import styles from './styles.module.scss'
import {FiChevronDown} from 'react-icons/fi'

function Button(props) {
  const {title, variant = 'solid', size = 'md', disabled = false, arrow = false, className} = props

  const typesStyle = {
    solid: styles.button__solid,
    outlined: styles.button__outlined,
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
}

export default Button
