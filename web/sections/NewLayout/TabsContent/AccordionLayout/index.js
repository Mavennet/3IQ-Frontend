import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import styles from './styles.module.scss'
import SimpleBlockContent from '../../../../components/OldLayout/SimpleBlockContent'
import {Container} from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import CustomPostCard from '../../custom/CustomPostCard'
import groq from 'groq'
import Button from '../../../../components/NewLayout/Button'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}
const theme = createTheme()

function AccordionLayout(props) {
  const {heading, description, tabItems, currentLanguage, backgroundImage} = props

  const [selected, setSelected] = useState(0)
  const [articles, setArticles] = useState([])
  const containerRef = useRef(null)


  const fetchCategory = async () => {
    await client
      .fetch(
        groq`*[_type == 'post' && !(_id in path('drafts.**')) && $categoryId in categories[]._ref] | order(dateTime(publishedAt) desc) {
          _id,
          _type,
          publishedAt,
        }[0..2]`,
        {categoryId: tabItems[selected].selectedPostCategory._id}
      )
      .then((response) => {
        const postsId = []
        response.map((item) => {
          return postsId.push(item._id)
        })
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
              {postsIds: postsId}
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
    if (selected) {
      fetchCategory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  fetchCategory()

  return (
    <>
      <Container maxWidth={'lg'} bgcolor="#F6F6F6">
        <Grid container mt={10} mb={20}>
          <Grid item md={12}>
            <h4>Investment Funds</h4>
          </Grid>
          <Grid item md={12} sx={{display: {sm: 'block', md: 'none'}}}>
            <div className={`${styles.menu} ${styles.light__blue}`} ref={containerRef}>
              <ul>
                {tabItems &&
                  tabItems.map((item, index) => {
                    return (
                      <li onClick={() => setSelected(index)} key={index}>
                        <a className={selected == index && styles.active}>
                          {item.localeName[currentLanguage.languageTag]}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </Grid>
          <Grid item md={3} sx={{display: {xs: 'none', md: 'block'}}}>
            {tabItems.map((item, index) => (
              <p
                onClick={() => setSelected(index)}
                className={`${styles.item} ${selected == index && styles.active}`}
              >
                {item.localeName && item.localeName[currentLanguage.languageTag]}
              </p>
            ))}
          </Grid>

          <Grid item md={9} pt={2} pl={2}>
            <div className={styles.content}>
              <div className={styles.content__text}>
                <SimpleBlockContent
                  blocks={tabItems[selected].localecontentBlock[currentLanguage.languageTag]}
                />
              </div>
              <Box mt={3}>
                <Grid contianer xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <h3>Press Releases</h3>
                  {tabItems[selected].localeButton && tabItems[selected].localeButton[currentLanguage.languageTag] && (
                     <Button className={styles.button} size={"sm"} variant="outlined" {...tabItems[selected].localeButton[currentLanguage.languageTag]} />
                  )}
                 
                </Grid>
                <Grid container mt={3} spacing={2}>
                  {articles &&
                    articles.map((newsCard) => (
                      <Grid item md={4}>
                        <CustomPostCard
                          {...newsCard}
                          currentLanguage={currentLanguage}
                          key={newsCard._id}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

AccordionLayout.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.object,
  tabItems: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
}

export default AccordionLayout
