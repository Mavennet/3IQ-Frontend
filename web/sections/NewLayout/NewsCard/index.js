import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { format } from 'date-fns'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Link from 'next/link'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function NewsCard(props) {
  const { post, buttonText, route, currentLanguage, isInvertedLayout, shortDescription } = props

  const localeHeading = post.heading[currentLanguage.languageTag]

  const [publishedDate, setPublishedDate] = React.useState('')

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
    <Grid container component="main" sx={{ flexDirection: { xs: 'column-reverse', md: isInvertedLayout ? 'unset' : 'row-reverse' } }}>
      <Grid item xs={12} md={6} square>
        <Link
          href={{
            pathname: `/${localeHeading}`,
            query: { slug: route.slug.current },
          }}
          as={`/${route.slug.current}`}
        >
          <a className={styles.no__decoration}>
            <Box
              sx={{
                mt: { xs: 4, md: 8 },
                mb: { xs: 0, md: 2 },
                ml: { xs: 2, md: 10 },
                mr: { xs: 0, md: 8 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                color: '#091b3f',
              }}
            >
              {post?.author?.name && post?.categories[0]?._key && (
                <Typography
                  my={2}
                  variant="h5"
                  sx={{
                    fontSize: 'var(--font-size-secondary-sm)',
                    fontFamily: 'var(--font-family-secondary)',
                    color: 'var(--black)',
                  }}
                >
                  <strong className={styles.blue}>{post?.categories[0]?._key + ' '}</strong>
                  by {post?.author?.name}
                </Typography>
              )}
              {localeHeading && (
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    fontSize: 'var(--font-size-primary-md)',
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--black)',
                  }}
                  gutterBottom
                >
                  {localeHeading}
                </Typography>
              )}
              {shortDescription && (
                <div className={styles.simple__block__content}>
                  <SimpleBlockContent blocks={shortDescription} />
                </div>
              )}
              <Box
                sx={{
                  mt: 5,
                  mb: 5,
                }}
              >
                {publishedDate && (
                  <Typography variant="h5"
                    sx={{
                      fontSize: 'var(--font-size-secondary-sm)',
                      fontFamily: 'var(--font-family-secondary)',
                      color: 'var(--black)',
                    }}
                  >
                    {publishedDate}
                  </Typography>
                )}
              </Box>
            </Box>
          </a>
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        py={{ xs: 28, md: 0 }}
        md={6}
        sx={{
          background:
            post.mainImage && `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-end', md: 'center' },
          alignItems: 'center',
        }}
      >
      </Grid>
    </Grid>
  )

}

NewsCard.propTypes = {
  post: PropTypes.object,
  buttonText: PropTypes.string,
  currentLanguage: PropTypes.object,
  route: PropTypes.object,
  isInvertedLayout: PropTypes.bool,
  shortDescription: PropTypes.object,
}

export default NewsCard
