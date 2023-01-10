import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import Button from '../Button'
import SimpleBlockContent from '../../OldLayout/SimpleBlockContent'
import { RiCloseLine } from 'react-icons/ri'

function Popup(props) {

  const { content } = props

  const [hiddenPopup, setHiddenPopup] = React.useState(false)

  return (
    !hiddenPopup && (
      <div className={styles.popup__box}>
        <div className={styles.button__container}>
          <div className={styles.close__button} onClick={() => setHiddenPopup(true)}>
            <RiCloseLine size={20} color={'var(--black)'} />
          </div>
        </div>
        <div className={styles.simple__block__content}>
          <SimpleBlockContent blocks={content} />
        </div>
        <Button
          title={'Go to content'}
          size={'sm'}
        />
      </div>
    )
  )
}

Popup.propTypes = {
  content: PropTypes.object,
}

export default Popup
