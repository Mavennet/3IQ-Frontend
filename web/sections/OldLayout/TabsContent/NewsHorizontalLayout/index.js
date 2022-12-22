import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import RedirectButton from '../../../../components/OldLayout/RedirectButton'
import styles from './NewsHorizontalLayout.module.css'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import { format } from 'date-fns'
import Link from 'next/link'

function NewsHorizontalLayout(props) {
  const { post, route, currentLanguage, localeButtonText, localeSmallCardText } = props

  const [publishedDate, setPublishedDate] = React.useState('')

  const builder = imageUrlBuilder(client)

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post.publishedAt)
      const isEng = currentLanguage.name === "EN"
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
        locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
      })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, post.publishedAt])

  return (
    <Grid container mb={4} spacing={2}>
      <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.imgGrid}>
          {
            post?.mainImage && route && (
              <Link
                href={{
                  pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
                  query: { slug: route.slug.current },
                }}
                as={`/${route.slug.current}`}
              >
                <a>
                  <Image
                    src={builder.image(post?.mainImage.asset._ref).url()}
                    alt={post?.heading}
                    layout='fill'
                    objectFit='cover'
                  />
                </a>
              </Link>
            )
          }
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {post?.localeHeading && route && (
            <Link
              href={{
                pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
                query: { slug: route.slug.current },
              }}
              as={`/${route.slug.current}`}
            >
              <a className={styles.noDecoration}>
                <Typography component="h1" variant="h1" sx={{ fontSize: '24px' }}>
                  {post?.localeHeading[currentLanguage.languageTag]}
                </Typography>
              </a>
            </Link>
          )}
          {post?.publishedAt && publishedDate &&(
            <Typography variant="h5" my={1} sx={{ fontSize: '14px' }}>
              {publishedDate}
            </Typography>
          )}
          {
            localeSmallCardText && localeSmallCardText[currentLanguage.languageTag] && (
              <Typography variant="p" sx={{ fontSize: '16px' }}>
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
                fontSize: '16px',
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
