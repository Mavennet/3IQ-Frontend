import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
} from '@mui/material'
import SimpleBlockContent from '../../../../components/OldLayout/SimpleBlockContent'
import RedirectButton from '../../../../components/OldLayout/RedirectButton'
import styles from '../TabsLayout/styles.module.scss'
import CustomPostCard from '../../custom/CustomPostCard'
import NewsletterGrid from '../NewsletterGrid'
import NewsHorizontalLayout from '../NewsHorizontalLayout'
import client from '../../../../client'
import groq from 'groq'

function TabPanel(values) {
  const { children, value, index, ...other } = values

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={styles.simpleBlockContent}>{children}</div>}
    </div>
  )
}

function TabItem(props) {
  const {
    selectedPostCategory,
    localecontentBlock,
    isPaginatedNewsletter,
    currentLanguage,
    translatedButton,
    key,
    value,
    index,
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
    <TabPanel key={key} value={value} index={index}>
      {localecontentBlock && (
        <Grid container ml={0} spacing={2} sx={{ background: '#fff' }} className={styles.simpleBlockContent}>
          <SimpleBlockContent
            blocks={localecontentBlock[currentLanguage.languageTag]}
          />
        </Grid>
      )}
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
      {translatedButton && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
            my={4}
          >
            <RedirectButton
              {...translatedButton}
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
    </TabPanel>
  )
}

TabItem.propTypes = {
  selectedPostCategory: PropTypes.object,
  localecontentBlock: PropTypes.object,
  isPaginatedNewsletter: PropTypes.bool,
  currentLanguage: PropTypes.object,
  translatedButton: PropTypes.object,
  key: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.string,
  isNewsCardsHorizontalLayout: PropTypes.bool,
}

export default TabItem
