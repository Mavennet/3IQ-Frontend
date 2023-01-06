import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import ArticleCard from '../../../components/NewLayout/ArticleCard'
import { Grid, Container } from '@mui/material'
import groq from 'groq'

function AutomatedNewsCard(props) {
  const { selectedPostCategory, isInvertedLayout, currentLanguage } = props

  const [newsCard, setNewsCard] = useState(null)

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
              setNewsCard(res)
              console.log(res)
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
      <Grid container spacing={2} my={8}>
        {
          newsCard && (
            newsCard.map((item) => {
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
      </Grid>
    </Container>
  )
}

AutomatedNewsCard.propTypes = {
  selectedPostCategory: PropTypes.object,
  isInvertedLayout: PropTypes.bool,
  currentLanguage: PropTypes.object,
}

export default AutomatedNewsCard
