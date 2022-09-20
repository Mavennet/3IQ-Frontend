import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import styles from './NewsHorizontalLayout.module.css'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import { format, parseISO } from 'date-fns'

function NewsHorizontalLayout(props) {
  const { post, route, currentLanguage, localeButtonText, localeSmallCardText } = props

  const builder = imageUrlBuilder(client)

  return (
    <Grid container mb={4} spacing={2}>
      <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.imgGrid}>
          {
            post?.mainImage && (
              <Image
                src={builder.image(post?.mainImage.asset._ref).url()}
                alt={post?.heading}
                layout='fill'
                objectFit='cover'
              />
            )
          }
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={9} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
        {post?.localeHeading && (
          <Typography component="h1" variant="h1">
            {post?.localeHeading[currentLanguage.languageTag]}
          </Typography>
        )}
        {post?.publishedAt && (
          <Typography variant="h5" my={1}>
            {format(parseISO(post?.publishedAt), 'MMMM d, yyyy')}
          </Typography>
        )}
        {
          localeSmallCardText && localeSmallCardText[currentLanguage.languageTag] && (
            <Typography variant="p">
              {`${localeSmallCardText[currentLanguage.languageTag].substring(0, 200)}...`}
            </Typography>
          )
        }
        </div>
        {
          route && localeButtonText && (
            <RedirectButton
              {...props}
              title={`${localeButtonText[currentLanguage.languageTag]} »`}
              sx={{
                width: 'auto',
                fontSize: '14px',
                mt: 2,
                border: '2px solid #DC6E19',
                padding: '2px 5px',
                borderRadius: '0px',
                color: '#DC6E19',
                fontWeight: '400',
                background: 'none',
              }}
            />
          )
        }
      </Grid>
    </Grid>
  )
}

NewsHorizontalLayout.propTypes = {
  post: PropTypes.object,
  route: PropTypes.object,
  currentLanguage: PropTypes.object,
  localeButtonText: PropTypes.string,
  localeSmallCardText: PropTypes.string,
}

export default NewsHorizontalLayout
