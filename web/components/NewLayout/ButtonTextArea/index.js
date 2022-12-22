import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

function ButtonTextArea(props) {
  const {buttonTitle, placeholder, size = 'sm', disabled, actionUrl} = props

  console.log(actionUrl)

  return (

    <div className={styles.button__text__area}>
      <input disabled={disabled} className={`${styles.input} ${size}`} placeholder={placeholder} />
      <a disabled={disabled} className={`${styles.button} ${size}`}>{buttonTitle}</a>
    </div>


  )
}

ButtonTextArea.propTypes = {
  size: PropTypes.string,
  buttonTitle: PropTypes.string,
  placeholder: PropTypes.string,
  actionUrl: PropTypes.string,
  disabled: PropTypes.boolean
}

export default ButtonTextArea
