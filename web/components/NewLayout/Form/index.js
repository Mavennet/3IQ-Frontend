import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

function Form(props) {
    const {placeholder, size = 'sm', disabled = false} = props

    return (

        <div className={styles.form}>
            <input disabled={disabled} className={`${styles.input} ${size}`} placeholder={placeholder} />
        </div>

    )
}

Form.propTypes = {
    size: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.boolean
}

export default Form
