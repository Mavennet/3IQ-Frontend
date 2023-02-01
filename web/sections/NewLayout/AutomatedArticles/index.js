import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import {
  Grid,
  Container,
  Box,
  Typography
} from '@mui/material'
import Button from '../../../components/NewLayout/Button'
import NewsletterCard from '../../../components/NewLayout/NewletterCard'
import groq from 'groq'
import styles from './styles.module.scss'
import ArticleCard from '../../../components/NewLayout/ArticleCard'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

function AutomatedArticles(props) {
  const { selectedPostCategory, currentLanguage, button, name, align, buttonInHeader, articlesCount = 3 } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  const [articles, setArticles] = useState(null)

  const containerRef = React.useRef(null)

  const handleArrow = (type) => {
    if (type === 'next') {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft + 300
    } else {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft - 300
    }
  }

  const fetchCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }`,
        { categoryId: selectedPostCategory._ref }
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
                    singularName,
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
              }[0..${articlesCount - 1}]`,
              { postsIds: postsId }
            )
            .then((res) => {
              res.sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
              setArticles(res)
            })
        }
        fetchArticles()
      })
  }

  useEffect(() => {
    fetchCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'xl' } }}>
      <Grid container pb={4} mt={10}>
        {
          name && (
            <Grid item xs={12} mb={2} p={{ xs: 1, md: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="h2"
                className={styles.title}
                sx={{
                  fontSize: {xs: 'var(--font-size-primary-md)', md: 'var(--font-size-primary-lg)'},
                  fontFamily: 'var(--font-family-primary)',
                  color: 'var(--black)',
                  textAlign: align ? align : 'center',
                  width: buttonInHeader ? 'auto' : '100%'
                }}
              >
                {name}
              </Typography>
              <div className={styles.arrows}>
                <IoIosArrowDropleft
                  size={40}
                  onClick={() => handleArrow('prev')}
                />
                <IoIosArrowDropright
                  size={40}
                  onClick={() => handleArrow('next')}
                />
              </div>
              {
                localeButton && (localeButton.route || localeButton.link) && buttonInHeader && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    <Button
                      {...localeButton}
                      variant={'outlinedBlack'}
                      arrow={false}
                      size={'sm'}
                      redirectArrow={true}
                    />
                  </Box>
                )
              }
            </Grid>
          )
        }
        <Grid container>
          <div className={styles.news__container} ref={containerRef}>
            {
              articles && (
                articles.map((item, i) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} mb={4} p={{ xs: 1, md: 2 }}>
                      {
                        item.newsletterNumber ? (
                          <NewsletterCard
                            {...item}
                            currentLanguage={currentLanguage}
                            size={'md'}
                          />
                        ) : (
                          <ArticleCard
                            {...item}
                            currentLanguage={currentLanguage}
                            key={item._id}
                          />
                        )
                      }

                    </Grid>
                  )
                })
              )
            }
          </div>
        </Grid>
        {
          localeButton && (localeButton.route || localeButton.link) && !buttonInHeader && (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} mt={3}>
              <Button
                {...localeButton}
                variant={'solidOrange'}
                arrow={false}
              />
            </Grid>
          )
        }
      </Grid>
    </Container>
  )
}

AutomatedArticles.propTypes = {
  name: PropTypes.string,
  align: PropTypes.string,
  articlesCount: PropTypes.number,
  buttonInHeader: PropTypes.bool,
  selectedPostCategory: PropTypes.object,
  currentLanguage: PropTypes.object,
  button: PropTypes.object
}

export default AutomatedArticles
