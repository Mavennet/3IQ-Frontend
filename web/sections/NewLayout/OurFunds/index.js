import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import {IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/io'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'

function OurFunds(props) {
  const {
    heading,
  } = props

  console.log(props)

  const boxItemSx = {
    width: {
      md: '1000px'
    },
    height: {
      md: '500px'
    }
  }

  const containerRef = React.useRef(null)

  const handleArrow = (type) => {
    if (type === 'next') {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft + 300
    } else {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft - 300
    }
  }

  return (
    <section className={styles.our__funds__section}>
      <Container>
        <Grid container mb={4}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Our Funds</h2>
            <div className={styles.arrows}>
              <IoIosArrowDropleft
                size={40}
                onClick={() => handleArrow('prev')}
              />
              <IoIosArrowDropright
                size={40}
                onClick={() => handleArrow('next')}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <div>
        <div className={styles.box__container} ref={containerRef}>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <h4>3iQ CoinShares Bitcoin ETF</h4>
            </div>
            <p>
              Navigate We help investors navigate and understand the evolving digital asset space
              with investment solutions that provide-+
            </p>
          </div>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <h4>3iQ CoinShares Bitcoin ETF</h4>
            </div>
            <p>
              Navigate We help investors navigate and understand the evolving digital asset space
              with investment solutions that provide-+
            </p>
          </div>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <h4>3iQ CoinShares Bitcoin ETF</h4>
            </div>
            <p>
              Navigate We help investors navigate and understand the evolving digital asset space
              with investment solutions that provide-+
            </p>
          </div>
          <div className={styles.box__main__hero}>
            <div className={styles.box__title}>
              <h4>3iQ CoinShares Bitcoin ETF</h4>
            </div>
            <p>
              Navigate We help investors navigate and understand the evolving digital asset space
              with investment solutions that provide-+
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

OurFunds.propTypes = {
  heading: PropTypes.string,

}

export default OurFunds
