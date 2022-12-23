import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
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

    return (
        <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
            <div className={styles.box__section}>


                <div className={styles.box__container}>
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
                            <h4>3iQ CoinShares Ether ETF</h4>
                        </div>
                        <p>
                            We help investors navigate and understand the evolving digital asset space with investment solutions that provide
                        </p>
                    </div>
                    <div className={styles.box__main__hero}>
                        <div className={styles.box__title}>
                            <h4>3iQ Global Cryptoasset Fund</h4>
                        </div>
                        <p>
                            We help investors navigate and understand the evolving digital asset space with investment solutions that provide
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

OurFunds.propTypes = {
    heading: PropTypes.string,

}

export default OurFunds
