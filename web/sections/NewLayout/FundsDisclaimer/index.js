import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

function FundsDisclaimer(props) {
  const {heading = 'Disclaimer', portableText} = props
  return (
    <section id={styles.disclaimer__section}>
      <Container sx={{py:6, px: 3}}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.portable__text}>
          <SimpleBlockContent blocks={portableText}></SimpleBlockContent>
          <div className={styles.shadow}></div>
        </div>
      </Container>
    </section>
  )
}

FundsDisclaimer.propTypes = {
  heading: PropTypes.string,
  portableText: PropTypes.object,
}

export default FundsDisclaimer
