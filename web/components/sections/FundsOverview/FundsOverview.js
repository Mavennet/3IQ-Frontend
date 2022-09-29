import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './FundsOverview.module.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import RedirectButton from '../../RedirectButton/RedirectButton'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import FundSidebarItem from '../../FundSidebarItem/FundSidebarItem'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function FundsOverview(props) {
  const {currentLanguage, fundSidebarItem} = props

  console.log(props)
  return (
    <Box>
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Grid container>
          <Grid item container md={8}>
            a
          </Grid>
          <Grid item container md={4}>
            {fundSidebarItem &&
              fundSidebarItem.map((fundItem) => (
                <FundSidebarItem
                  title={fundItem.localeTitle[currentLanguage.languageTag]}
                  text={fundItem.localeText[currentLanguage.languageTag]}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

FundsOverview.propTypes = {
  text: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
  isButtonCentralized: PropTypes.bool,
}

export default FundsOverview
