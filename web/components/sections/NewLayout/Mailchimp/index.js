import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { FiChevronDown } from 'react-icons/fi'
import { Container, Grid } from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import SimplePortableText from '../../../../../studio/schemas/objects/simplePortableText'
import Form from '../../../NewLayout/Form'
import ButtonTextArea from '../../../NewLayout/ButtonTextArea'


function Mailchimp(props) {
    const { text, inputPlaceholder, actionUrl } = props

    const typesStyle = {
        solid: styles.button__solid,
        outlined: styles.button__outlined,
    }

    return (
        <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
            <Grid container className={styles.mailchimp}>
                <Grid item md={8}  >
                        <SimpleBlockContent blocks={text} />
                </Grid>
                <Grid item md={4} >
                    <ButtonTextArea placeholder={inputPlaceholder} buttonTitle="Subscribe"/>
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
