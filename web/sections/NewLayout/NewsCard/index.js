import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { Grid, Typography, Box } from '@mui/material'
import { format } from 'date-fns'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Link from 'next/link'
import groq from 'groq'
import { AiFillPlayCircle } from 'react-icons/ai'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function NewsCard(props) {
  const { post, buttonText, route, currentLanguage, isInvertedLayout, shortDescription } = props

  const localeHeading = post.heading[currentLanguage.languageTag]

  const [publishedDate, setPublishedDate] = React.useState('')
  const [categorie, setCategorie] = React.useState(null)

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

  React.useEffect(() => {
    const fetchCategories = async (ref) => {
      await client
        .fetch(
          groq`
        *[_type == 'category' && _id == $categorieRef] {
          _id,
          _ref,
          name,
        }[0]
       `,
          { categorieRef: ref }
        )
        .then((response) => {
          setCategorie(response)
        })
    }
    console.log(post?.categories[0]?._ref)
    fetchCategories(post?.categories[0]?._ref)
  }, [])

  return (
    <Link
      href={{
        pathname: `/${localeHeading}`,
        query: { slug: route.slug.current },
      }}
      as={`/${route.slug.current}`}
    >
      <a className={styles.no__decoration}>
        <Grid container component="main" sx={{ flexDirection: { xs: 'column-reverse', md: isInvertedLayout ? 'unset' : 'row-reverse' } }}>
          <Grid item xs={12} md={6} square>
            <Box>
              {categorie?.name && (
                <Typography
                  my={2}
                  component="h2"
                  variant="h2"
                  sx={{
                    fontSize: 'var(--font-size-primary-md)',
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--black)',
                    mt: { xs: 4, md: 8 },
                    mb: { xs: 0, md: 2 },
                    ml: { xs: 2, md: 10 },
                    mr: { xs: 0, md: 8 },
                  }}
                >
                  {categorie?.name?.[currentLanguage.languageTag]}
                </Typography>
              )}
            </Box>
            <Box my={4}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </Box>
            <Box
              sx={{
                mb: { xs: 0, md: 2 },
                ml: { xs: 2, md: 10 },
                mr: { xs: 0, md: 8 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                color: '#091b3f',
              }}
            >
              {post?.author?.name && categorie?.name && (
                <Typography
                  my={2}
                  variant="h5"
                  sx={{
                    fontSize: 'var(--font-size-secondary-sm)',
                    fontFamily: 'var(--font-family-secondary)',
                    color: 'var(--black)',
                  }}
                >
                  <strong className={styles.blue}>{categorie?.name?.[currentLanguage.languageTag] + ' '}</strong>
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
                      color: '#A9A9A9',
                    }}
                  >
                    {publishedDate}
                  </Typography>
                )}
              </Box>
            </Box>
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
            {
              categorie?._id === 'f0043b46-c820-4101-81c7-81caf7deba35' && (
                <AiFillPlayCircle
                  size={90}
                  color={'var(--white)'}
                />
              )
            }
          </Grid>
        </Grid>
      </a>
    </Link>
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
