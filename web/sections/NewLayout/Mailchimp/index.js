import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import ButtonTextArea from '../../../components/NewLayout/ButtonTextArea'


function Mailchimp(props) {
    const { text, inputPlaceholder, actionUrl } = props

    const typesStyle = {
        solid: styles.button__solid,
        outlined: styles.button__outlined,
    }

    return (
        <Container sx={{ maxWidth: { sm: 'md', lg: 'lg', xl: 'xl' } }}>
            <Grid container className={styles.mailchimp} mb={5} py={{md: 6, xs: 3}} px={{md: 4, xs: 3}}>
                <Grid item sm={8} xs={12}  >
                        <SimpleBlockContent blocks={text} />
                </Grid>
                <Grid pt={{xs: 3, md: false}} item sm={4} xs={12} >
                    <ButtonTextArea size="md" placeholder={inputPlaceholder} buttonTitle="Subscribe"/>
                </Grid>
            </Grid>
        </Container>
        // <button
        //   className={`${styles.button} ${typesStyle[variant]} ${size} ${className}`}
        //   disabled={disabled}
        // >
        //   <div className={styles.button__title}>{title}</div>
        //   {arrow && (<FiChevronDown className={styles.arrow} />)}
        // </button>
    )
}

Mailchimp.propTypes = {
    title: PropTypes.string.isRequired,
    variant: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.boolean,
    arrow: PropTypes.boolean,
}

export default Mailchimp
