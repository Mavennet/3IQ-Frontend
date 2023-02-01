import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import styles from './styles.module.scss'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { format } from 'date-fns'
import Link from 'next/link'
import { AiFillPlayCircle } from 'react-icons/ai'

function ArticleCard(props) {
  const { post, route, hideImage = false, currentLanguage } = props

  const [publishedDate, setPublishedDate] = React.useState('')

  const builder = imageUrlBuilder(client)

  React.useEffect(() => {
    if (currentLanguage.languageTag && post?.publishedAt) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post.publishedAt)
      const isEng = currentLanguage.name === "EN"
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
        locale: getLocale(currentLanguage.languageTag.replace('_', '-')),
      })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, post?.publishedAt])

  return (
    <Link
      href={{
        pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
        query: { slug: route?.slug?.current },
      }}
      as={`/${route?.slug?.current}`}
    >
      <a>
        <div className={styles.article__card}>
          <Grid container>
            {
              !hideImage && (
                <Grid item xs={12}>
                  <div className={styles.imgGrid}>
                    {
                      post?.mainImage && route && (
                        <Image
                          src={builder.image(post?.mainImage.asset._ref).url()}
                          alt={post?.heading}
                          layout='fill'
                          objectFit='cover'
                        />
                      )
                    }
                    {
                      (post?.categories[0]?.searchId === 'videos' || post?.categories[0]?.searchId === 'podcasts' )  && (
                        <div className={styles.play}>
                          <AiFillPlayCircle
                            size={90}
                            color={'var(--white)'}
                          />
                        </div>
                      )
                    }
                  </div>
                </Grid>
              )
            }
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                {post?.author?.name && post?.categories[0]?.singularName[currentLanguage.languageTag] && (
                  <Typography
                    mt={2}
                    variant="h5"
                    sx={{
                      fontSize: 'var(--font-size-secondary-sm)',
                      fontFamily: 'var(--font-family-secondary)',
                      color: 'var(--black)',
                      wordWrap: 'break-word'
                    }}
                  >
                    <span className={styles.blue}>{post?.categories[0]?.singularName[currentLanguage.languageTag] + ' '}</span>
                    by {post?.author?.name}
                  </Typography>
                )}
                {post?.localeHeading && route && (
                  <Link
                    href={{
                      pathname: `/${post?.localeHeading[currentLanguage.languageTag]}`,
                      query: { slug: route.slug.current },
                    }}
                    as={`/${route.slug.current}`}
                  >
                    <a className={styles.noDecoration}>
                      <Typography
                        component="h2"
                        variant="h2"
                        my={2}
                        sx={{
                          fontSize: 'var(--font-size-primary-sm)',
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
                      fontSize: 'var(--font-size-secondary-sm)',
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

ArticleCard.propTypes = {
  post: PropTypes.object,
  hideImage: PropTypes.bool,
  route: PropTypes.object,
  currentLanguage: PropTypes.object,
  localeButtonText: PropTypes.string,
  localeSmallCardText: PropTypes.string,
}

export default ArticleCard
