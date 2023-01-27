import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import Button from '../Button'
import SimpleBlockContent from '../../OldLayout/SimpleBlockContent'
import { RiCloseLine } from 'react-icons/ri'

function Popup(props) {

  const { content, closeHandler, route } = props

  return (
    <div className={styles.popup__box}>
      <div className={styles.button__container}>
        <div className={styles.close__button} onClick={() => closeHandler()}>
          <RiCloseLine size={20} color={'var(--black)'} />
        </div>
      </div>
      <div className={styles.simple__block__content}>
        <SimpleBlockContent blocks={content} />
      </div>
      <div className={styles.block__button}>
        <Button
          title={'Go to content'}
          size={'sm'}
          route={route}
        />
      </div>
    </div>
  )
}

Popup.propTypes = {
  content: PropTypes.object,
}

export default Popup
