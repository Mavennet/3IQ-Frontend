import React from 'react'
import PropTypes from 'prop-types'
import client from '../../../client'
import { Grid, Container, Box } from '@mui/material'
import styles from './styles.module.scss'
import Link from 'next/link'
import groq from 'groq'
import {
  RiArticleLine,
  RiFilePaperLine,
  RiVideoLine,
  RiMailSendLine,
  RiSlideshow2Line,
  RiMic2Line
} from 'react-icons/ri'

function CategoriesList(props) {
  const { route, currentLanguage, categories, heading } = props

  const [categoriesList, setCategoriesList] = React.useState([])

  React.useEffect(() => {
    const fetchCategories = async (ids) => {
      await client
        .fetch(
          groq`
        *[_type == 'category' && _id in $categorieRef] | order(searchId asc) {
          _id,
          name,
          searchId,
        }
       `,
          { categorieRef: ids }
        )
        .then((response) => {
          setCategoriesList(response)
        })
    }
    if (categories && categoriesList.length == 0) {
      let ids = []
      categories.forEach((categorie) => ids.push(categorie._ref))
      fetchCategories(ids)
    }
  }, [])

  const icons = {
    podcasts: <RiMic2Line />,
    articles: <RiArticleLine />,
    newsletter: <RiMailSendLine />,
    white_papers: <RiFilePaperLine />,
    webinar: <RiSlideshow2Line />,
    videos: <RiVideoLine />
  }

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg', xl: 'xl' } }}>
      <Grid container py={10}>
        <Grid item xs={12}>
          <ul className={styles.list}>
            <li>
              <Link
                href={{
                  pathname: `/${heading}`,
                  query: { slug: route.slug.current },
                }}
                as={`/${route.slug.current}`}
              >
                <a className={styles.no__decoration}>
                  {heading}
                </a>
              </Link>
            </li>
            {
              categoriesList.map((item, i) => {
                return (
                  <li key={item._id}>
                    <Link
                      href={{
                        pathname: `/${item.searchId}`,
                        query: { slug: item.searchId },
                      }}
                      as={`/${item.searchId}`}
                    >
                      <a className={styles.no__decoration}>
                        <div className={styles.box}>
                          <Box
                            className={styles.icon}
                            sx={{
                              width: '40px',
                              height: '40px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '50%',
                              marginRight: { xs: 0, md: 1 }
                            }}
                          >
                            {
                              icons[item.searchId] ? icons[item.searchId] : <RiArticleLine />
                            }
                          </Box>
                          {item.name[currentLanguage.languageTag]}
                        </div>
                      </a>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </Grid>
      </Grid>
    </Container>
  )

}

CategoriesList.propTypes = {
  heading: PropTypes.object,
  currentLanguage: PropTypes.object,
  route: PropTypes.object,
  categories: PropTypes.object,
}

export default CategoriesList
