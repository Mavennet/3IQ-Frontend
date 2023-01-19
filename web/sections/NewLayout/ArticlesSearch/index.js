import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import client from '../../../client'
import Form from '../../../components/NewLayout/Form'
import Dropdown from '../../../components/NewLayout/Dropdown'
import Button from '../../../components/NewLayout/Button'
import {ROUTES_BY_TERM, CATEGORIES, NEWS_CARD_BY_TERM} from '../../../utils/groqQueries'
import SearchCard from '../../../components/NewLayout/SearchCard'
import NewsletterCard from '../../../components/NewLayout/NewletterCard'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'

function ArticlesSearch(props) {
  const {heading, notFoundText, currentLanguage, currentCountry} = props
  const [sectionDropdownValue, setSectionDropdownValue] = useState([])
  const [filterDropdownValue, setFilterDropdownValue] = useState([])
  const [routes, setRoutes] = useState([])
  const [posts, setPosts] = useState(null)
  const [data, setData] = useState({})
  const [categories, setCategories] = useState([])
  const [sections, setSections] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  function showNotFoundText() {
    let show = false
    let hasData = []
    posts && categories && categories.map((c) => hasData.push(posts[c].length > 0))
    show = !(hasData.indexOf(true) >= 0)
    return show
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }

  function showSection(section) {
    return (
      posts &&
      ((sections.indexOf(section) >= 0 && posts[section] && posts[section].length > 0) ||
        (sections.length == 0 && posts[section] && posts[section].length > 0))
    )
  }

  async function search() {
    if (categories.length > 0) {
      let categoryIds = []
      categories.map((c) => categoryIds.push(c._id))
      // let webinars =
      if (searchTerm.length == 3 || (searchTerm.length > 3 && (searchTerm.length - 3) % 3 == 0)) {
        await client
          .fetch(ROUTES_BY_TERM, {term: searchTerm, urlTag: currentCountry.urlTag})
          .then((res) => setRoutes(res))
        await client
          .fetch(NEWS_CARD_BY_TERM, {
            term: searchTerm,
            languageTag: currentLanguage.languageTag,
          })
          .then((res) => filterPosts(res))
      }
    }
  }

  function filterPosts(posts, independentSearch = true) {
    let filteredPosts = {}
    categories.map((c) => (filteredPosts[c] = []))
    posts.map((p) => {
      p.post.categories.map((c) => {
        categories.indexOf(c.searchId) >= 0 && filteredPosts[c.searchId].push(p)
      })
    })
    if (independentSearch && filterDropdownValue && filterDropdownValue.value == 'most_recent') {
      categories.map((c) =>
        filteredPosts[c].sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
      )
    }
    setData(posts)
    setPosts(filteredPosts)
  }

  async function fetchCategories() {
    await client.fetch(CATEGORIES).then((res) => {
      let categoryIds = []
      res.map((r) => categoryIds.push(r.searchId))
      setCategories(categoryIds)
    })
  }

  useEffect(() => {
    categories && categories.length == 0 && fetchCategories()
    search()
  }, [searchTerm])

  useEffect(() => {
    categories && categories.length == 0 && fetchCategories()
    search()
  }, [filterDropdownValue])


  return (
    <>
      <Box pb={10} bgcolor={'#f9f9f9'}>
        <Container maxWidth={'lg'}>
          <Box py={2}>
            <Form
              onChange={(e) => handleSearch(e)}
              placeholder={'Type in your search terms and press enter'}
            />
          </Box>

          {showNotFoundText() && (
            <div className={styles.notFound}>
              {searchTerm ? (<p>Sorry, there are no results for {searchTerm}.</p>) : (<p>Type something to search.</p>)}
              <SimpleBlockContent blocks={notFoundText} />
            </div>
          )}
          {showSection('articles') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Articles</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.articles ? posts.articles.length : 0}</strong>
                  </span>
                </Box>
              </Box>
              <Grid container spacing={8}>
                {posts &&
                  posts.articles &&
                  posts.articles.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}

ArticlesSearch.propTypes = {
  heading: PropTypes.string,
}

export default ArticlesSearch
