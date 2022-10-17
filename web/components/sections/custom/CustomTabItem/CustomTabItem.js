import Grid from '@mui/material/Grid'
import React from 'react'
import SimpleBlockContent from '../../../SimpleBlockContent'
import styles from '../CustomTab/CustomTab.module.css'
import CustomPostCard from '../CustomPostCard/CustomPostCard'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import NewsHorizontalLayout from '../../TabsContent/NewsHorizontalLayout/NewsHorizontalLayout'
import NewsletterGrid from '../../TabsContent/NewsletterGrid/NewsletterGrid'
import PropTypes from 'prop-types'
import client from '../../../../client'
import groq from 'groq'

export default function CustomTabItem(props) {

  const {
    localeButton,
    localecontentBlock,
    selectedPostCategory,
    isPaginatedNewsletter,
    currentLanguage,
    isNewsCardsHorizontalLayout
  } = props

  const [articles, setArticles] = React.useState(null)

  const fetchCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0..2]`,
        { categoryId: selectedPostCategory._id }
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
              res.sort((a,b) => new Date(b.post.publishedAt) -  new Date(a.post.publishedAt))
              setArticles(res)
            })
        }
        fetchArticles()
      })
  }

  React.useEffect(() => {
    if (selectedPostCategory) {
      fetchCategory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPostCategory])

  return (
    <>
      {localecontentBlock &&
        localecontentBlock[currentLanguage.languageTag].map((section, index) => (
          <div key={`blockContent_${index}`} className={styles.simpleBlockContent}>
            <SimpleBlockContent blocks={section} />
          </div>
        ))}
      {
        isPaginatedNewsletter && (
          <NewsletterGrid
            {...props}
            currentLanguage={currentLanguage}
          />
        )
      }
      {
        articles && !isPaginatedNewsletter && (
          <Grid container alignItems="stretch">
            {articles.map((item) => {
              return (
                !isNewsCardsHorizontalLayout ? (
                  <Grid
                    item
                    key={item._id}
                    style={{ display: 'flex' }}
                    pt={5}
                    md={4}
                    pr={2}
                  >
                    <CustomPostCard
                      {...item}
                      languageTag={currentLanguage.languageTag}
                      key={item._id}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} key={item._id}>
                    <NewsHorizontalLayout
                      {...item}
                      currentLanguage={currentLanguage}
                      key={item._id}
                    />
                  </Grid>
                )
              )
            })}
          </Grid>
        )
      }
      {localeButton && localeButton[currentLanguage.languageTag] && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
            my={4}
          >
            <RedirectButton
              {...localeButton[currentLanguage.languageTag]}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                background: '#DC6E19',
                borderColor: '#DC6E19',
                color: '#fff',
                fontWeight: '300',
              }}
            />
          </Grid>
        </Grid>
      )}

    </>
  )
}

CustomTabItem.propTypes = {
  selectedPostCategory: PropTypes.object,
  localecontentBlock: PropTypes.object,
  isPaginatedNewsletter: PropTypes.bool,
  currentLanguage: PropTypes.object,
  localeButton: PropTypes.object,
  isNewsCardsHorizontalLayout: PropTypes.bool,
}
