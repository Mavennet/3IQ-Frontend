import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import { Typography, Box } from '@mui/material'
import client from '../../../client'
import imageUrlBuilder from '@sanity/image-url'
import { BiLock } from 'react-icons/bi'

const builder = imageUrlBuilder(client)

function FundSidebarItem(props) {
  const { localeTitle, localeText, localeObservation, mainImage, listImage, listItems, languageTag } =
    props

  return (
    <Box sx={{ mb: 5 }}>
      {localeTitle && localeTitle[languageTag] && (
        <Typography
          sx={{
            color: 'var(--black)',
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-primary-lg)',

          }}
          component="h2"
          variant="h4"
        >
          {localeTitle[languageTag]}
        </Typography>
      )}
      {mainImage && (
        <Box sx={{ width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
          <Box
            component="img"
            sx={{
              width: { xs: 150 },
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
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={`item_${index}`} mb={2}>
                  {listImage && (
                    <Box mr={2}>
                      <BiLock
                        size={35}
                        color={'var(--light-orange)'}
                      />
                    </Box>
                  )}
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontFamily: 'var(--font-family-secondary)',
                      fontSize: 'var(--font-size-secondary-md)',
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
                color: 'var(--black)',
                fontFamily: 'var(--font-family-secondary)',
                fontSize: 'var(--font-size-secondary-md)',
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
