import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import {
  Grid,
  Container,
} from '@mui/material'
import Button from '../../../components/NewLayout/Button'
import groq from 'groq'
import styles from './styles.module.scss'
import ArticleCard from '../../../components/NewLayout/ArticleCard'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

function AutomatedArticles(props) {
  const { selectedPostCategory, currentLanguage, button, name } = props

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
        }[0..2]`,
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
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
      <Grid container pb={4} mt={10}>
        {
          name && (
            <Grid item xs={12} mb={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', md: 'center' } }}>
              <h2 className={styles.title}>{name}</h2>
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
            </Grid>
          )
        }
        <Grid container spacing={6} my={8}>
          <div className={styles.news__container} ref={containerRef}>
            {
              articles && (
                articles.map((item) => {
                  return (
                    <Grid item xs={12} sm={6} mb={4}>
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
        {
          localeButton && (localeButton.route || localeButton.link) && (
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
  selectedPostCategory: PropTypes.object,
  currentLanguage: PropTypes.object,
  button: PropTypes.object
}

export default AutomatedArticles
