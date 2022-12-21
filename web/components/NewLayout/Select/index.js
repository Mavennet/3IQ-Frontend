import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

function Form(props) {
    const { type = "radio", items} = props

    return (

        <div className={styles.select}>
            {
                items.map(i => (
                    <div key={`item_${i.id}`}>
                        <input disabled={i.disabled} className={styles.select__input} id={i.id} name={i.name} value={i.value} type={type} />
                        <label disabled={i.disabled} className={styles.select__label} htmlFor={i.id}>{i.label}</label>
                    </div>
                ))
            }

        </div>

    )
}

Form.propTypes = {
    type: PropTypes.string,
    items: PropTypes.array,
}

export default Form
