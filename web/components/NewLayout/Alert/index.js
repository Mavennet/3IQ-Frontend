import React from 'react'
import {PropTypes} from 'prop-types'
import styles from './styles.module.scss'
import {RiInformationLine, RiCloseLine} from 'react-icons/ri'

function Alert(props) {
  const [hiddenAlert, setHiddenAlert] = React.useState(false)

  const {title, variant = 'primary', size="sm"} = props

  const variantsStyle = {
    primary: styles.primary,
    error: styles.error,
    success: styles.success,
    warning: styles.warning,
  }

  return (
    !hiddenAlert && (
      <section className={`${variantsStyle[variant]} ${styles.alert} ${size}`}>
        <div className={styles.text}>
          <RiInformationLine size={30} />
          <p>{title}</p>
        </div>
        <RiCloseLine size={22} className={styles.close} onClick={() => setHiddenAlert(true)} />
      </section>
    )
  )
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string
}

export default Alert
