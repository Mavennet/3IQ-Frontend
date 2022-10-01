import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FundSidebarItem from '../../FundSidebarItem/FundSidebarItem'
import SimpleBlockContent from '../../SimpleBlockContent'
import styles from './FundsOverview.module.css'
import { Typography } from '@mui/material'

function FundsOverview(props) {
  const {title, embed, currentLanguage, fundSidebarItem} = props

  return (
    <Box>
      <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
        <Grid container>
          <Grid item md={8} pr={{xs: 0, md: 10}}>
            {title && (
              <Typography component="h2" variant="h4" sx={{fontWeight: 'bold', color: '#0082E5'}}>
                {title}
              </Typography>
            )}
            {embed && (
              <Box className={styles.simpleBlockContent}>
                <SimpleBlockContent blocks={embed} />
              </Box>
            )}
          </Grid>
          <Grid item container md={4}>
            {fundSidebarItem &&
              fundSidebarItem.map((fundItem, index) => (
                <FundSidebarItem
                  key={`fundSidebarItem_${index}`}
                  {...fundItem}
                  languageTag={currentLanguage.languageTag}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

FundsOverview.propTypes = {
  title: PropTypes.object,
  embed: PropTypes.object,
  currentLanguage: PropTypes.object,
  fundSidebarItem: PropTypes.array,
}

export default FundsOverview
