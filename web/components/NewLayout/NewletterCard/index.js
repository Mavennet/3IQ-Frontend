import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Typography, Box} from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import {format} from 'date-fns'
import Link from 'next/link'
import {AiFillPlayCircle} from 'react-icons/ai'

function NewsletterCard(props) {
  const {post, newsletterNumber, route, currentLanguage} = props

  const [publishedDate, setPublishedDate] = React.useState('')

  const builder = imageUrlBuilder(client)

  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post.publishedAt)
      const isEng = currentLanguage.name === 'EN'
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
        locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
      })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, post.publishedAt])

  return (
    <Link
      href={{
        pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
        query: {slug: route.slug.current},
      }}
      as={`/${route.slug.current}`}
    >
      <a>
        <div className={styles.article__card}>
          <Grid container>
            <Grid item xs={2}>
              <Box
                mt={2.5}
                sx={{
                  background: '#0D1C3D',
                  color: 'white',
                  width: '60px',
                  height: '60px',
                  textAlign: 'center',
                  fontSize: 'var(--font-size-secondary-xs)',
                  fontFamily: 'var(--font-family-primary)',
                }}
              >
                <Box pt={2.5}>#{newsletterNumber}</Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={10}
              pl={3}
            >
              <div className={styles.newsletterCard}>
                {post?.author?.name &&
                  post?.categories[0]?.localeName[currentLanguage.languageTag] && (
                    <Typography
                      mt={2}
                      variant="h5"
                      sx={{
                        fontSize: 'var(--font-size-secondary-xs)',
                        fontFamily: 'var(--font-family-secondary)',
                        color: 'var(--black)',
                      }}
                    
                    >
                      <span className={styles.blue}>
                        {post?.categories[0]?.localeName[currentLanguage.languageTag] + ' '}
                      </span>
                      by {post?.author?.name}
                    </Typography>
                  )}
                {post?.localeHeading && route && (
                  <Link
                    href={{
                      pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
                      query: {slug: route.slug.current},
                    }}
                    as={`/${route.slug.current}`}
                  >
                    <a className={styles.noDecoration}>
                      <Typography
                        component="h3"
                        variant="h3"
                        my={1}
                        sx={{
                          fontSize: 'var(--font-size-secondary-sm)',
                          fontFamily: 'var(--font-family-primary)',
                          color: 'var(--black)',
                        }}
                      >
                        {post?.localeHeading[currentLanguage.languageTag]}
                      </Typography>
                    </a>
                  </Link>
                )}
                {post?.publishedAt && publishedDate && (
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: 'var(--font-size-secondary-xs)',
                      fontFamily: 'var(--font-family-secondary)',
                      color: 'var(--text-gray)',
                    }}
                  >
                    {publishedDate}
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </a>
    </Link>
  )
}

NewsletterCard.propTypes = {
  post: PropTypes.object,
  route: PropTypes.object,
  currentLanguage: PropTypes.object,
  localeButtonText: PropTypes.string,
  localeSmallCardText: PropTypes.string,
}

export default NewsletterCard
