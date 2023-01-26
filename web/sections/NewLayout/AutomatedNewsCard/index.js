import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import ArticleCard from '../../../components/NewLayout/ArticleCard'
import {Grid, Container} from '@mui/material'
import groq from 'groq'
import {CATEGORY_BY_ID} from '../../../utils/groqQueries'
import NewsletterCard from '../../../components/NewLayout/NewletterCard'
import Button from '../../../components/NewLayout/Button'

function AutomatedNewsCard(props) {
  const {selectedPostCategory, isInvertedLayout, buttonText, currentLanguage} = props

  const [newsCard, setNewsCard] = useState(null)
  const [category, setCategory] = useState(null)
  const [maxQuantity, setMaxQuantity] = useState(6)

  const renderCards = () => {
    if (category && newsCard) {
      if (category.searchId == 'videos' || category.searchId == 'webinars') {
        return newsCard.map((item) => (
          <Grid item xs={12} sm={6} mb={4}>
            <ArticleCard {...item} currentLanguage={currentLanguage} key={item._id} />
          </Grid>
        ))
      }
      if (category.searchId == 'newsletter') {
        return newsCard.map((item) => (
          <Grid item xs={12} sm={6} mb={4}>
            <NewsletterCard {...item} currentLanguage={currentLanguage} key={item._id} />
          </Grid>
        ))
      }
    }
  }

  const fetchCategory = async () => {
    await client.fetch(CATEGORY_BY_ID, {id: selectedPostCategory._ref}).then((response) => {
      setCategory(response)
    })
  }

  const fetchPosts = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
        _id,
        _type,
        publishedAt,
      }[0..${maxQuantity}]`,
        {categoryId: selectedPostCategory._ref}
      )
      .then((response) => {
        const postsId = []
        response.map((item) => {
          return postsId.push(item._id)
        })
        fetchArticles(postsId)
      })
  }

  const fetchArticles = async (id) => {
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
              ...
            },
            author-> {
              _id,
              _type,
              name,
              email,
              profilePhoto,
            },
          },
        }`,
        {postsIds: id}
      )
      .then((res) => {
        res.sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
        setNewsCard(res)
      })
  }

  useEffect(() => {
    fetchPosts()
    fetchCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxQuantity])

  return (
    <Container sx={{maxWidth: {sm: 'md', lg: 'lg'}}}>
      <Grid container spacing={6} my={8}>
        {renderCards()}
        <Grid item xs={12} align="center">
          <Button size="xs" variant="outlined" onClick={() => setMaxQuantity(maxQuantity + 6)} title={buttonText || 'View More'} />
        </Grid>
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
