import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  Container,
  CssBaseline,
} from '@mui/material'
import NewsHorizontalLayout from '../TabsContent/NewsHorizontalLayout'
import RedirectButton from '../../../components/OldLayout/RedirectButton'
import groq from 'groq'
import client from '../../../client'

function Articles(props) {
  const { currentLanguage, newsCards, button } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  const [posts, setPosts] = React.useState()

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

  const fetchPosts = async () => {
    const postsId = []
    newsCards.map((item) => { return postsId.push(item._ref) })
    await client.fetch(
      groq`
      *[_type == 'newsCard' && _id in $testArrayString] {
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
          author-> {
            _id,
            _type,
            name,
            email,
            profilePhoto,
          },
        }
      }
     `,
     { testArrayString: postsId }
    )
      .then((response) => {
        response.sort((a,b) => new Date(b.post.publishedAt) -  new Date(a.post.publishedAt))
        setPosts(response)
      })
  }

  React.useEffect(() => {
    if (newsCards) {
      fetchPosts()
    }
  }, [newsCards])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container pb={4} mt={10}>
          {
            posts && (
              posts.map((item) => {
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
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}} mt={3}>
                <RedirectButton
                  {...localeButton}
                  sx={{ width: { xs: '96%', md: 180 }, padding: '10px 20px', fontSize: '16px', background: '#dc6e19', borderColor: '#dc6e19', color: '#fff' }}
                />
              </Grid>
            )
          }
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

Articles.propTypes = {
  currentLanguage: PropTypes.object,
  newsCards: PropTypes.array,
  button: PropTypes.object
}

export default Articles
