import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import client from '../../../client'
import { Grid, Container, Typography } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import { MdOutlineArrowForward } from 'react-icons/md'
import groq from 'groq'
import Link from 'next/link'

function Post(props) {

  const { body, currentLanguage, categories } = props

  const [relatedArticles, setRelatedArticles] = React.useState(null)

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

  React.useEffect(() => {
    fetchRelatedArticles()
  }, [])

  return (
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
  )
}

Post.propTypes = {
  body: PropTypes.object,
  currentLanguage: PropTypes.object,
  categories: PropTypes.object,
}

export default Post
