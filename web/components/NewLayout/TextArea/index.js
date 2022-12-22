import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

function TextArea(props) {
    const {placeholder, size = 'lg', disabled = false, actionUrl} = props

    console.log(actionUrl)

    return (

        <div className={styles.form}>
            <textarea disabled={disabled} className={`${styles.text__area} ${size}`} placeholder={placeholder} />
        </div>

    )
}

TextArea.propTypes = {
    size: PropTypes.string,
    placeholder: PropTypes.string,
    actionUrl: PropTypes.string,
    disabled: PropTypes.boolean
}

export default TextArea
