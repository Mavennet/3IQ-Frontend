import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import Button from '../Button'
import SimpleBlockContent from '../../OldLayout/SimpleBlockContent'
import { RiCloseLine } from 'react-icons/ri'
import { Grid } from '@mui/material'

function Popup(props) {

  const { content, closeHandler, route } = props

  const goToContent = () => {
    localStorage.setItem('lastUpdate', route._id);
  }

  return (
    <div className={styles.popup__box}>
      <Grid container p={2}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className={styles.close__button} onClick={() => closeHandler()}>
            <RiCloseLine size={20} color={'#000'} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.simple__block__content}>
            <SimpleBlockContent blocks={content} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div onClick={() => goToContent()}>
            <Button
              title={'Go to content'}
              size={'xs'}
              route={route}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

Popup.propTypes = {
  content: PropTypes.object,
}

export default Popup
