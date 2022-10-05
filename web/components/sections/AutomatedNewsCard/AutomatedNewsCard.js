import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import NewsCard from '../NewsCard/NewsCard'
import groq from 'groq'

function AutomatedNewsCard(props) {
  const {selectedPostCategory, isInvertedLayout, currentLanguage} = props

  const [newsCard, setNewsCard] = useState(null)


  const fetchCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
      _id,
      _type,
      publishedAt,
    }[0]`,
        {categoryId: selectedPostCategory._ref}
      )
      .then((response) => {
        const fetchNewsCard = async () => {
          await client
            .fetch(
              groq`*[_type == 'newsCard' && $latestPostId == post._ref] {
            _id,
            _type,
            _rev,
            'localeButtonText': buttonText,
            'localeShortDescription': shortDescription,
            route->,
            post-> {
              _id,
              _type,
              mainImage,
              heading,
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
              {latestPostId: response._id}
            )
            .then((res) => {
              setNewsCard(res)
            })
        }
        fetchNewsCard()
      })
  }

  useEffect(() => {
    fetchCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    newsCard && (
      <NewsCard
        {...newsCard}
        buttonText={newsCard.localeButtonText[currentLanguage.languageTag]}
        shortDescription={newsCard.localeShortDescription[currentLanguage.languageTag]}
        currentLanguage={currentLanguage}
        isInvertedLayout={isInvertedLayout}
      />
    )
  )
}

AutomatedNewsCard.propTypes = {
  selectedPostCategory: PropTypes.object,
  isInvertedLayout: PropTypes.bool,
  currentLanguage: PropTypes.object,
}

export default AutomatedNewsCard
