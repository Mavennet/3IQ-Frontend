import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  Container,
  CssBaseline,
} from '@mui/material'
import NewsHorizontalLayout from '../TabsContent/NewsHorizontalLayout/NewsHorizontalLayout'
import RedirectButton from '../../RedirectButton/RedirectButton'
import groq from 'groq'

function AutomatedArticles(props) {
  const { selectedPostCategory, currentLanguage, button } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  const [articles, setArticles] = useState(null)

  const theme = createTheme({
    typography: {
      fontFamily: 'Europa',
      h1: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      h5: {
        verticalAlign: 'middle',
        fontSize: '14px',
      },
      p: {
        fontSize: 16,
      },
    },
  })

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <Grid container pb={4} mt={10}>
            {
              articles && (
                articles.map((item) => {
                  return (
                    <NewsHorizontalLayout
                      {...item}
                      currentLanguage={currentLanguage}
                      key={item._id}
                    />
                  )
                })
              )
            }
            {
              localeButton && (localeButton.route || localeButton.link) && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} mt={3}>
                  <RedirectButton
                    {...localeButton}
                    sx={{ width: { xs: '96%', md: 180 }, padding: '10px 20px', fontSize: '16px', background: '#dc6e19', borderColor: '#dc6e19', color: '#fff' }}
                  />
                </Grid>
              )
            }
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

AutomatedArticles.propTypes = {
  selectedPostCategory: PropTypes.object,
  currentLanguage: PropTypes.object,
  button: PropTypes.object
}

export default AutomatedArticles
