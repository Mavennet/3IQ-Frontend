/* eslint-disable no-debugger, no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Button from '../../../components/NewLayout/Button'

function ReadyToInvest(props) {
  const { heading, currentLanguage, ctaButton, backgroundColor } = props

  const localeButton = ctaButton[currentLanguage?.languageTag]

  return (
    <Box sx={{
      backgroundColor: backgroundColor && backgroundColor
    }}>
      <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'lg' } }} >
        <Grid container py={15}>
          {
            heading && (
              <Grid item xs={12} mb={6}>
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={heading} />
                </div>
              </Grid>
            )
          }
          {localeButton && (localeButton.route || localeButton.link) &&
            (<Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
              <Button
                {...localeButton}
                reverse={false}
                variant={'solid'}
                className={styles.button}
              ></Button>
            </Grid>)}
        </Grid>
      </Container>
    </Box >
  )
}

ReadyToInvest.propTypes = {
  heading: PropTypes.object,
  backgroundColor: PropTypes.string,
  ctaButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default ReadyToInvest
