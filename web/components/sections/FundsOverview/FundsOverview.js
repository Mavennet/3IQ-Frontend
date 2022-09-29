import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FundSidebarItem from '../../FundSidebarItem/FundSidebarItem'


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
              fundSidebarItem.map((fundItem, index) => (
                <FundSidebarItem
                  key={`fundSidebarItem_${index}`}
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
  currentLanguage: PropTypes.object,
  fundSidebarItem: PropTypes.object
}

export default FundsOverview
