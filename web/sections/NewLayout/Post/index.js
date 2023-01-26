import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './styles.module.scss'
import client from '../../../client'
import { Grid, Container, Typography, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import { format } from 'date-fns'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { MdOutlineArrowForward } from 'react-icons/md'
import groq from 'groq'
import Link from 'next/link'

const builder = imageUrlBuilder(client)

function Post(props) {

  const { heading, body, publishedAt, mainImage, currentLanguage, currentCountry, categories, author } = props

  const [publishedDate, setPublishedDate] = React.useState('')
  const [categorie, setCategorie] = React.useState(null)
  const [authorName, setAuthorName] = React.useState(null)
  const [relatedArticles, setRelatedArticles] = React.useState(null)

  currentCountry.urlTag === 'ae' && body.forEach(block => {
    if (block._type === 'block') {
      block.markDefs.length > 0 && block.markDefs.forEach(m => {
        if (m._type === 'link') {
          m.href = m.href.replace('https://3iq.ca', 'https://staging--3iq-ae-dev.netlify.app/ae')
        }
      })
    }
  })
  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(publishedAt)
      const isEng = currentLanguage.name === "EN"
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : "dd MMMM yyyy", { locale: getLocale(currentLanguage.languageTag.replace("_", "-")) })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, publishedAt])

  const fetchCategories = async (ref) => {
    await client
      .fetch(
        groq`
      *[_type == 'category' && _id == $categorieRef] {
        _id,
        _ref,
        name,
        searchId,
        description
      }[0]
     `,
        { categorieRef: ref }
      )
      .then((response) => {
        setCategorie(response)
      })
  }

  const fetchRelatedArticles = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0..2]`,
        { categoryId: categories[0]?._ref }
      )
      .then((response) => {
        const postsId = []
        response.map((item) => { return postsId.push(item._id) })
        const fetchArticles = async () => {
          await client
            .fetch(
              groq`
              *[_type == 'newsCard' && !(_id in path('drafts.**')) && post._ref in $postsIds] {
                _id,
                _type,
                _rev,
                'localeButtonText': buttonText,
                'localeShortDescription': shortDescription,
                'localeSmallCardText': smallCardText,
                newsletterNumber,
                route->,
                post-> {
                  _id,
                  _type,
                  mainImage,
                  'localeHeading': heading,
                  publishedAt,
                  categories[]-> {
                    _id,
                    _type,
                    'localeName': name,
                  },
                  author-> {
                    _id,
                    _type,
                    name,
                    email,
                    profilePhoto,
                  },
                },
              }[0..2]`,
              { postsIds: postsId }
            )
            .then((res) => {
              res.sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
              setRelatedArticles(res)
            })
        }
        fetchArticles()
      })
  }

  const fetchAuthor = async (ref) => {
    await client
      .fetch(
        groq`
      *[_type == 'person' && _id == $authorRef] {
        _id,
        name,
      }[0]
     `,
        { authorRef: ref }
      )
      .then((response) => {
        setAuthorName(response)
      })
  }

  React.useEffect(() => {
    fetchCategories(categories[0]?._ref)
    fetchAuthor(author?._ref)
    fetchRelatedArticles()
  }, [])

  const shareHistoryText = currentCountry.shareThisStoryText && currentCountry.shareThisStoryText[currentLanguage.languageTag]

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            md: 'unset',
          },
        }}
      >
        <Grid item xs={12} md={6} sx={{ background: '#EBEBEB', position: 'relative' }} square>
          <Box
            sx={{
              mt: 2,
              mb: { xs: 0, md: 2 },
              ml: { xs: 2, md: 10 },
              mr: { xs: 0, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#091b3f',
            }}
          >
            <Grid container>
              <Grid item xs={12} mt={6}>
                {categorie?.name && (
                  <Typography
                    my={2}
                    component="h2"
                    variant="h2"
                    sx={{
                      fontSize: 'var(--font-size-secondary-md)',
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--light-orange)',
                    }}
                  >
                    {categorie?.name?.[currentLanguage.languageTag]}
                  </Typography>
                )}
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    fontSize: 'var(--font-size-primary-lg)',
                    fontFamily: 'var(--font-family-primary),'
                  }}
                >
                  {heading}
                </Typography>
                {authorName?.name && categorie?.name && (
                  <Typography
                    my={2}
                    variant="h5"
                    sx={{
                      fontSize: 'var(--font-size-secondary-sm)',
                      fontFamily: 'var(--font-family-secondary)',
                      color: 'var(--black)',
                    }}
                  >
                    <strong className={styles.blue}>
                      {categorie?.name?.[currentLanguage.languageTag] + ' '}
                    </strong>
                    by {authorName.name}
                  </Typography>
                )}
              </Grid>
              {
                publishedDate && (
                  <Grid item xs={12} my={2}>
                    <div className={styles.publishedAt}>
                      <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                          fontWeight: 400,
                          fontSize: 'var(--font-size-secondary-md)',
                          fontFamily: 'var(--font-family-secondary)',
                          color: '#8E8E8E'
                        }}>
                        {publishedDate}
                      </Typography>
                    </div>
                  </Grid>
                )
              }
              {
                shareHistoryText && (
                  <Grid item xs={12} my={8}>
                    <Typography
                      component="h4"
                      variant="h4"
                      mb={2}
                      style={{
                        fontWeight: 600,
                        fontSize: 'var(--font-size-secondary-md)',
                        fontFamily: 'var(--font-family-secondary)',
                        color: 'var(--black)',
                        width: '100%'
                      }}>
                      {shareHistoryText}
                    </Typography>
                    <ul className={styles.social}>
                      <Link href={`http://twitter.com/share?text=${heading}&url=${window.location.href}`} color="inherit" target='_blank' rel="noopener">
                        <a>
                          <li>
                            <FaTwitter />
                          </li>
                        </a>
                      </Link>
                      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${heading}&summary=${heading}&source=LinkedIn`} color="inherit" target='_blank' rel="noopener">
                        <a>
                          <li>
                            <FaLinkedinIn />
                          </li>
                        </a>
                      </Link>
                    </ul>
                  </Grid>
                )
              }
            </Grid>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
            }}
          >
            <div className={styles.stripe} />
            <div className={styles.stripe} />
            <div className={styles.stripe} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          py={{ xs: 28, md: 0 }}
          md={6}
          sx={{
            background:
              mainImage &&
              `url("${builder.image(mainImage).url()}") no-repeat center center`,
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
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container my={2} spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid container>
              {
                body && (
                  <Grid item xs={12}>
                    <div className={styles.simple__block__content}>
                      {body && <SimpleBlockContent blocks={body} />}
                    </div>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} my={4}>
            <Grid container>
              {
                relatedArticles && (
                  <Grid item xs={12}>
                    <Typography
                      component="h4"
                      variant="h4"
                      sx={{
                        fontSize: 'var(--font-size-primary-md)',
                        fontFamily: 'var(--font-family-primary)',
                      }}
                    >
                      Related content
                    </Typography>
                    <ul className={styles.related__articles}>
                      {
                        relatedArticles.map((item) => {
                          return (
                            <li>
                              <Link
                                href={{
                                  pathname: `/${item.post?.localeHeading?.[currentLanguage.languageTag]}`,
                                  query: { slug: item.route.slug.current },
                                }}
                                as={`/${item.route.slug.current}`}
                              >
                                <a className={styles.no__decoration}>
                                  <Typography
                                    component="h5"
                                    variant="h5"
                                    sx={{
                                      fontSize: 'var(--font-size-secondary-md)',
                                      fontFamily: 'var(--font-family-secondary)',
                                      fontWeight: 500,
                                      color: 'var(--light-blue)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      flexWrap: 'wrap'
                                    }}
                                  >
                                    {item.post?.localeHeading?.[currentLanguage.languageTag]}
                                    <MdOutlineArrowForward
                                      className={styles.icon}
                                    />
                                  </Typography>
                                </a>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

Post.propTypes = {
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  heading: PropTypes.object,
  body: PropTypes.object,
  publishedAt: PropTypes.object,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
}

export default Post
