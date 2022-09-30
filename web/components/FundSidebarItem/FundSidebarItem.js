import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../SimpleBlockContent'
import styles from './FundSidebarItem.module.css'
import {Typography, Box, Grid} from '@mui/material'
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function FundSidebarItem(props) {
  const {localeTitle, localeText, localeObservation, mainImage, listImage, listItems, languageTag} =
    props

  return (
    <Box sx={{mb: 5, mt: 5}}>
      {localeTitle && localeTitle[languageTag] && (
        <Typography sx={{fontWeight: 'bold', color: '#0082e5'}} component="h2" variant="h4">
          {localeTitle[languageTag]}
        </Typography>
      )}
      {mainImage && (
        <Box sx={{width: '100%', textAlign: {xs: 'center', md: 'left'}}}>
          <Box
            component="img"
            sx={{
              width: {xs: 150},
            }}
            alt={mainImage.alt}
            src={builder.image(mainImage).url()}
          />
        </Box>
      )}
      {localeText && localeText[languageTag] && (
        <div className={styles.textSection}>
          <SimpleBlockContent blocks={localeText[languageTag]} />
        </div>
      )}
      {listItems && (
        <Box mt={3}>
          {listItems.map(
            (item, index) =>
              item[languageTag] && (
                <Box sx={{display: 'flex'}} key={`item_${index}`}>
                  {listImage && (
                    <Box
                      component="img"
                      sx={{
                        width: 70,
                      }}
                      alt={listImage.alt}
                      src={builder.image(listImage).url()}
                    />
                  )}
                  <Typography
                    sx={{
                      color: '#dc6e19',
                      mt: 2,
                      ml: 4,
                    }}
                  >
                    {item[languageTag]}
                  </Typography>
                </Box>
              )
          )}
          {localeObservation && localeObservation[languageTag] && (
            <Typography
              sx={{
                color: '#77757f',
                fontSize: '14px',
                mt: 2,
                ml: 13,
                mr: 8,
              }}
            >
              {localeObservation[languageTag]}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

FundSidebarItem.propTypes = {
  localeTitle: PropTypes.object,
  localeText: PropTypes.object,
  localeObservation: PropTypes.object,
  mainImage: PropTypes.object,
  listImage: PropTypes.object,
  listItems: PropTypes.arrayOf(PropTypes.string),
  languageTag: PropTypes.string,
}

export default FundSidebarItem
