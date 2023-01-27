import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Container,
  Box,
  Typography
} from '@mui/material'
import styles from './styles.module.scss'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import Button from '../../../components/NewLayout/Button'
import groq from 'groq'
import client from '../../../client'
import ArticleCard from '../../../components/NewLayout/ArticleCard'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'

function AutomatedLatest(props) {
  const {
    name,
    leftTitle,
    rightTitle,
    bottomTitle,
    leftCategory,
    rightCategory,
    bottomCategory,
    leftButton,
    rightButton,
    bottomButton,
    currentLanguage,
  } = props

  const leftLocaleButton = leftButton && leftButton[currentLanguage?.languageTag]
  const rightLocaleButton = rightButton && rightButton[currentLanguage?.languageTag]
  const bottomLocaleButton = bottomButton && bottomButton[currentLanguage?.languageTag]

  const [leftArticles, setLeftArticles] = useState(null)
  const [rightArticles, setRightArticles] = useState(null)
  const [bottomArticles, setBottomArticles] = useState(null)

  const containerLeftRef = React.useRef(null)
  const containerBottomRef = React.useRef(null)

  const builder = imageUrlBuilder(client)

  const handleArrow = (type, container) => {
    if (type === 'next') {
      container.current.scrollLeft = container.current.scrollLeft + 300
    } else {
      container.current.scrollLeft = container.current.scrollLeft - 300
    }
  }

  const fetchLeftCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0..1]`,
        { categoryId: leftCategory._ref }
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
              }[0..1]`,
              { postsIds: postsId }
            )
            .then((res) => {
              res.sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
              setLeftArticles(res)
            })
        }
        fetchArticles()
      })
  }

  const fetchRightCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0]`,
        { categoryId: rightCategory._ref }
      )
      .then((response) => {
        const fetchArticles = async () => {
          await client
            .fetch(
              groq`
              *[_type == 'newsCard' && !(_id in path('drafts.**')) && post._ref == $postId] {
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
              }[0]`,
              { postId: response._id }
            )
            .then((res) => {
              setRightArticles(res)
            })
        }
        fetchArticles()
      })
  }

  const fetchBottomCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0..2]`,
        { categoryId: bottomCategory._ref }
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
              setBottomArticles(res)
            })
        }
        fetchArticles()
      })
  }

  useEffect(() => {
    fetchLeftCategory()
    fetchRightCategory()
    fetchBottomCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Container sx={{ maxWidth: { sm: 'md', md: 'md', lg: 'xl' } }}>
      <Grid container py={8}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container>
            {
              leftTitle && (
                <Grid item xs={12} mb={2} p={{ xs: 1, md: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h2"
                    className={styles.title}
                    sx={{
                      fontSize: {xs: 'var(--font-size-primary-md)', md: 'var(--font-size-primary-lg)'},
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--black)',
                      textAlign: 'left',
                      width: 'auto'
                    }}
                  >
                    {leftTitle}
                  </Typography>
                  <div className={styles.arrows}>
                    <IoIosArrowDropleft
                      size={40}
                      onClick={() => handleArrow('prev', containerLeftRef)}
                    />
                    <IoIosArrowDropright
                      size={40}
                      onClick={() => handleArrow('next', containerLeftRef)}
                    />
                  </div>
                  {
                    leftLocaleButton && (leftLocaleButton.route || leftLocaleButton.link) && (
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        <Button
                          {...leftLocaleButton}
                          variant={'outlinedBlack'}
                          arrow={false}
                          size={'xs'}
                          redirectArrow={true}
                        />
                      </Box>
                    )
                  }
                </Grid>
              )
            }
            <Grid item xs={12}>
              <div className={styles.news__container} ref={containerLeftRef}>
                {
                  leftArticles && (
                    leftArticles.map((item) => {
                      return (
                        <Grid item xs={12} sm={6} mb={4} p={{ xs: 1, md: 2 }}>
                          <ArticleCard
                            {...item}
                            currentLanguage={currentLanguage}
                            key={item._id}
                            hideImage={true}
                          />
                        </Grid>
                      )
                    })
                  )
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container>
            {
              rightTitle && (
                <Grid item xs={12} mb={2} p={{ xs: 1, md: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h2"
                    className={styles.title}
                    sx={{
                      fontSize: '42px',
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--black)',
                      textAlign: 'left',
                      width: 'auto'
                    }}
                  >
                    {rightTitle}
                  </Typography>
                  {
                    rightLocaleButton && (rightLocaleButton.route || rightLocaleButton.link) && (
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        <Button
                          {...rightLocaleButton}
                          variant={'outlinedBlack'}
                          arrow={false}
                          size={'xs'}
                          redirectArrow={true}
                        />
                      </Box>
                    )
                  }
                </Grid>
              )
            }
            <Grid item xs={12} p={{ xs: 1, md: 2 }} mb={4}>
              {
                rightArticles && (
                  <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={4}>
                      <Box mr={2}>
                        <div className={styles.imgGrid}>
                          {
                            rightArticles.post?.mainImage && (
                              <Image
                                src={builder.image(rightArticles.post?.mainImage.asset._ref).url()}
                                alt={rightArticles.post?.heading}
                                layout='fill'
                                objectFit='cover'
                              />
                            )
                          }
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <ArticleCard
                        {...rightArticles}
                        currentLanguage={currentLanguage}
                        hideImage={true}
                      />
                    </Grid>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {
              bottomTitle && (
                <Grid item xs={12} mb={2} p={{ xs: 1, md: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h2"
                    className={styles.title}
                    sx={{
                      fontSize: '42px',
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--black)',
                      textAlign: 'left',
                      width: 'auto'
                    }}
                  >
                    {bottomTitle}
                  </Typography>
                  <div className={styles.arrows}>
                    <IoIosArrowDropleft
                      size={40}
                      onClick={() => handleArrow('prev', containerBottomRef)}
                    />
                    <IoIosArrowDropright
                      size={40}
                      onClick={() => handleArrow('next', containerBottomRef)}
                    />
                  </div>
                  {
                    bottomLocaleButton && (bottomLocaleButton.route || bottomLocaleButton.link) && (
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        <Button
                          {...bottomLocaleButton}
                          variant={'outlinedBlack'}
                          arrow={false}
                          size={'xs'}
                          redirectArrow={true}
                        />
                      </Box>
                    )
                  }
                </Grid>
              )
            }
            <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }} p={{ xs: 1, md: 2 }}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  {
                    bottomArticles && bottomArticles[0] && (
                      <ArticleCard
                        {...bottomArticles[0]}
                        currentLanguage={currentLanguage}
                      />
                    )
                  }
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      {
                        bottomArticles && bottomArticles[1] && (
                          <ArticleCard
                            {...bottomArticles[1]}
                            currentLanguage={currentLanguage}
                          />
                        )
                      }
                    </Grid>
                    <Grid item xs={12}>
                      {
                        bottomArticles && bottomArticles[2] && (
                          <ArticleCard
                            {...bottomArticles[2]}
                            currentLanguage={currentLanguage}
                          />
                        )
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
              <div className={styles.news__container} ref={containerBottomRef}>
                {
                  bottomArticles && (
                    bottomArticles.map((item) => {
                      return (
                        <Grid item xs={4} sm={6} mb={4} p={{ xs: 1, md: 2 }}>
                          <ArticleCard
                            {...item}
                            currentLanguage={currentLanguage}
                            key={item._id}
                          />
                        </Grid>
                      )
                    })
                  )
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

AutomatedLatest.propTypes = {
  name: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  bottomTitle: PropTypes.string,
  leftCategory: PropTypes.object,
  rightCategory: PropTypes.object,
  bottomCategory: PropTypes.object,
  leftButton: PropTypes.object,
  rightButton: PropTypes.object,
  bottomButton: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default AutomatedLatest
