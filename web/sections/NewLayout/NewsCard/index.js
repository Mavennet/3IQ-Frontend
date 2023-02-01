import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import {Grid, Typography, Box, Container} from '@mui/material'
import {format} from 'date-fns'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Link from 'next/link'
import groq from 'groq'
import {AiFillPlayCircle} from 'react-icons/ai'
import ButtonTextArea from '../../../components/NewLayout/ButtonTextArea'
import lines from '../../../assets/img/lines.png'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function NewsCard(props) {
  const {post, hideHeader, route, currentLanguage, isInvertedLayout, shortDescription, hideImage} =
    props

  const localeHeading = post.heading[currentLanguage.languageTag]

  const [publishedDate, setPublishedDate] = React.useState('')
  const [categorie, setCategorie] = React.useState(null)
  console.log(props)
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

  React.useEffect(() => {
    const fetchCategories = async (ref) => {
      await client
        .fetch(
          groq`
        *[_type == 'category' && _id == $categorieRef] {
          _id,
          _ref,
          optionalTitle,
          name,
          singularName,
          searchId,
          description
        }[0]
       `,
          {categorieRef: ref}
        )
        .then((response) => {
          setCategorie(response)
        })
    }
    fetchCategories(post?.categories[0]?._ref)
  }, [])

  function setCategorieCard() {
    if (categorie) {
      if (categorie.searchId == 'newsletter') {
        return (
          <Link
            href={{
              pathname: `/${localeHeading}`,
              query: {slug: route.slug.current},
            }}
            as={`/${route.slug.current}`}
          >
            <a className={styles.no__decoration__newsletter}>
              <Grid container>
                <Grid item md={7} xs={12} py={10} sx={{background: '#0D1C3D', color: 'white'}}>
                  <Box pl={13} pr={3} pb={5} className={styles.newsletter}>
                    <span className={styles.orangeText}>
                      {categorie.optionalTitle &&
                        categorie.optionalTitle[currentLanguage.languageTag]}
                    </span>
                    <h3>{categorie && categorie.name[currentLanguage.languageTag]}</h3>
                    <p>{categorie && categorie.description[currentLanguage.languageTag]}</p>
                  </Box>
                  <Box component="img" sx={{width: '100%'}} src={lines.src} />
                </Grid>
                <Grid item md={5} xs={12} sx={{background: '#EBEBEB'}}>
                  <Box pt={10} pb={2} px={5} className={styles.newsCard}>
                    <div className={styles.author}>
                      <span>
                        {categorie && categorie.singularName[currentLanguage.languageTag]}
                      </span>
                      {` by ${post.author.name}`}
                    </div>
                    <span></span>
                    <h4>{post.heading[currentLanguage.languageTag]}</h4>
                    <SimpleBlockContent blocks={shortDescription} />
                  </Box>
                  <Box pb={8} px={5} className={styles.newsCard}>
                    <span className={styles.publishedDate}>{publishedDate}</span>
                  </Box>
                </Grid>
              </Grid>
            </a>
          </Link>
        )
      } else if (categorie.searchId == 'videos' || categorie.searchId == 'podcasts') {
        return (
          <Link
            href={{
              pathname: `/${localeHeading}`,
              query: {slug: route.slug.current},
            }}
            as={`/${route.slug.current}`}
          >
            <a className={styles.no__decoration}>
              <Grid
                container
                component="main"
                sx={{
                  flexDirection: {
                    xs: 'column-reverse',
                    md: isInvertedLayout ? 'unset' : 'row-reverse',
                  },
                }}
              >
                <Grid item xs={12} md={6} sx={{background: '#EBEBEB'}} square>
                  {!hideHeader && (
                    <>
                      <Box
                        my={2}
                        sx={{
                          fontSize: 'var(--font-size-primary-md)',
                          fontFamily: 'var(--font-family-primary)',
                          color: 'var(--black)',
                          mt: {xs: 4, md: 8},
                          mb: {xs: 0, md: 2},
                          ml: {xs: 2, md: 10},
                          mr: {xs: 0, md: 8},
                        }}
                      >
                        <span className={styles.orangeText}>
                          {categorie.optionalTitle &&
                            categorie.optionalTitle[currentLanguage.languageTag]}
                        </span>
                        {categorie?.name && (
                          <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                              fontSize: 'var(--font-size-primary-md)',
                              fontFamily: 'var(--font-family-primary)',
                              color: 'var(--black)',
                            }}
                          >
                            {categorie?.name?.[currentLanguage.languageTag]}
                          </Typography>
                        )}
                      </Box>
                      <Box my={2}>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                      </Box>
                      <Box
                        sx={{
                          background:
                            post.mainImage &&
                            `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
                          backgroundSize: 'cover',
                          bgcolor: '#091b3f',
                          display: {xs: 'flex', md: 'none'},
                          flexDirection: 'column',
                          justifyContent: {xs: 'flex-end', md: 'center'},
                          alignItems: 'center',
                          py: 8,
                        }}
                      >
                        <AiFillPlayCircle size={90} color={'var(--white)'} />
                      </Box>
                    </>
                  )}
                  <Box
                    sx={{
                      mt: 2,
                      mb: {xs: 0, md: 2},
                      ml: {xs: 2, md: 10},
                      mr: {xs: 0, md: 8},
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
                        <span className={styles.blue}>
                          {categorie?.singularName?.[currentLanguage.languageTag] + ' '}
                        </span>
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
                        <Typography
                          variant="h5"
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
                  py={{xs: 28, md: 0}}
                  md={6}
                  sx={{
                    background:
                      post.mainImage &&
                      `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
                    backgroundSize: 'cover',
                    bgcolor: '#091b3f',
                    display: {xs: 'none', md: 'flex'},
                    flexDirection: 'column',
                    justifyContent: {xs: 'flex-end', md: 'center'},
                    alignItems: 'center',
                  }}
                >
                  <AiFillPlayCircle size={90} color={'var(--white)'} />
                </Grid>
              </Grid>
            </a>
          </Link>
        )
      } else {
        return (
          <Link
            href={{
              pathname: `/${localeHeading}`,
              query: {slug: route.slug.current},
            }}
            as={`/${route.slug.current}`}
          >
            <a className={styles.no__decoration}>
              <Grid
                container
                component="main"
                sx={{
                  flexDirection: {
                    xs: 'column-reverse',
                    md: isInvertedLayout ? 'unset' : 'row-reverse',
                  },
                }}
              >
                <Grid item xs={12} md={6} sx={{background: '#EBEBEB'}} square>
                  {!hideHeader && (
                    <>
                      <Box
                        my={2}
                        sx={{
                          fontSize: 'var(--font-size-primary-md)',
                          fontFamily: 'var(--font-family-primary)',
                          color: 'var(--black)',
                          mt: {xs: 4, md: 8},
                          mb: {xs: 0, md: 2},
                          ml: {xs: 2, md: 10},
                          mr: {xs: 0, md: 8},
                        }}
                      >
                        <span className={styles.orangeText}>
                          {categorie.optionalTitle &&
                            categorie.optionalTitle[currentLanguage.languageTag]}
                        </span>
                        {categorie?.name && (
                          <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                              fontSize: 'var(--font-size-primary-md)',
                              fontFamily: 'var(--font-family-primary)',
                              color: 'var(--black)',
                            }}
                          >
                            {categorie?.name?.[currentLanguage.languageTag]}
                          </Typography>
                        )}
                      </Box>
                      <Box my={2}>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                      </Box>
                    </>
                  )}
                  <Box
                    sx={{
                      mt: 2,
                      mb: {xs: 0, md: 2},
                      ml: {xs: 2, md: 10},
                      mr: {xs: 0, md: 8},
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
                        <span className={styles.blue}>
                          {categorie?.singularName?.[currentLanguage.languageTag] + ' '}
                        </span>
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
                        <Typography
                          variant="h5"
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
                  py={{xs: 28, md: 0}}
                  md={6}
                  sx={{
                    background:
                      post.mainImage &&
                      `url("${urlFor(post.mainImage).url()}") no-repeat center center`,
                    backgroundSize: 'cover',
                    bgcolor: '#091b3f',
                    display: {xs: hideImage && 'none', md: 'flex'},
                    flexDirection: 'column',
                    justifyContent: {xs: 'flex-end', md: 'center'},
                    alignItems: 'center',
                  }}
                >
                  {categorie?.searchId === 'videos' ||
                    (categorie?.searchId === 'podcasts' && (
                      <AiFillPlayCircle size={90} color={'var(--white)'} />
                    ))}
                </Grid>
              </Grid>
            </a>
          </Link>
        )
      }
    } else {
      return <></>
    }
  }

  return setCategorieCard()
}

NewsCard.propTypes = {
  post: PropTypes.object,
  currentLanguage: PropTypes.object,
  route: PropTypes.object,
  isInvertedLayout: PropTypes.bool,
  hideImage: PropTypes.bool,
  hideHeader: PropTypes.bool,
  shortDescription: PropTypes.object,
  optionalTitle: PropTypes.object,
}

export default NewsCard
