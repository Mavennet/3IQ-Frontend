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

function Search(props) {
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

  const sectionDropdownItems = [
    {
      id: 2,
      name: 'articles',
      label: 'Articles',
      value: 'articles',
    },
    {
      id: 3,
      name: 'white_papers',
      label: 'White Papers',
      value: 'white_papers',
    },
    {
      id: 4,
      name: 'videos',
      label: 'Videos',
      value: 'videos',
    },
    {
      id: 5,
      name: 'podcasts',
      label: 'Podcasts',
      value: 'podcasts',
    },
    {
      id: 6,
      name: 'webinar',
      label: 'Webinars',
      value: 'webinar',
    },
    {
      id: 7,
      name: 'newsletter',
      label: 'Newsletters',
      value: 'newsletter',
    },
    {
      id: 8,
      name: 'news',
      label: 'News',
      value: 'news',
    },
    {
      id: 8,
      name: 'press_releases',
      label: 'Press Releases',
      value: 'press_releases',
    },
  ]

  const filterDropdownItems = [
    {
      id: 2,
      name: 'relevancy',
      label: 'Relevancy',
      value: 'relevancy',
    },
    {
      id: 3,
      name: 'most_recent',
      label: 'Most Recent',
      value: 'most_recent',
    },
  ]

  function handleCardSize(cardQuantity) {
    let cardSize = 6
    if (cardQuantity !== 1) {
      if (cardQuantity < 4) {
        cardSize = 12 / cardQuantity
      } else {
        cardSize = 3
      }
    }
    return cardSize
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }

  function filterSections(evt) {
    setSectionDropdownValue(evt)
    let selectedItems = []
    evt.map((item) => selectedItems.push(item.name))
    setSections(selectedItems)
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

  function filterOrder(evt) {
    setFilterDropdownValue(evt)
    let filteredPosts = posts
    if (filteredPosts && evt.value == 'most_recent') {
      categories.map((c) =>
        filteredPosts[c].sort((a, b) => new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
      )
      setPosts(filteredPosts)
    }
    if (filteredPosts && evt.value == 'relevancy') {
      filterPosts(data, false)
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

  //   console.log(teams)

  //   const [members, setMembers] = useState([])
  //   const [memberSelected, setMemberSelected] = useState(0)

  //   function selectMember(position) {
  //     if (position == 'prev') {
  //       if (memberSelected != 0) {
  //         setMemberSelected(memberSelected - 1)
  //       } else {
  //         setMemberSelected(members.length - 1)
  //       }
  //     }

  //     if (position == 'next') {
  //       if (memberSelected != members.length - 1) {
  //         setMemberSelected(memberSelected + 1)
  //       } else {
  //         setMemberSelected(0)
  //       }
  //     }
  //   }

  //   useEffect(() => {
  //     const fetchMember = async (ids) => {
  //       await client
  //         .fetch(
  //           groq`
  //         *[_type == 'person' && _id in $personId] {
  //           _id,
  //           _type,
  //           name,
  //           jobTitle,
  //           bio,
  //           youtubeVideo,
  //           profilePhoto,
  //           linkedinUrl,
  //           email,
  //           contactText,
  //           ViewProfileText,
  //         }
  //        `,
  //           {personId: ids}
  //         )
  //         .then((response) => {
  //           setMembers(response)
  //         })
  //     }

  //     if (teams && members.length == 0) {
  //       let ids = []
  //       teams.forEach((member) => ids.push(member._ref))
  //       fetchMember(ids)
  //     }
  //   }, [])

  return (
    <>
      <Box  pb={10} bgcolor={'#f9f9f9'}>
        <Container maxWidth={'lg'}>
          <Box py={2}>
            <Form
              onChange={(e) => handleSearch(e)}
              placeholder={'Type in your search terms and press enter'}
            />
            <Grid container sx={{display: {md: 'none', sm: 'flex'}}} mt={1} spacing={2}>
              <Grid item xs={6}>
                <Dropdown
                  value={filterDropdownValue}
                  className={styles.search__dropdown__mobile}
                  title="Relevancy"
                  onChange={(e) => filterOrder(e)}
                  itens={filterDropdownItems}
                />
              </Grid>
              <Grid item xs={6}>
                <Dropdown
                  value={sectionDropdownValue}
                  className={styles.search__dropdown__mobile}
                  title="All"
                  isMulti
                  onChange={(e) => filterSections(e)}
                  itens={sectionDropdownItems}
                />
              </Grid>
            </Grid>
          </Box>
          <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {routes.length > 0 && (
                <>
                  <h3>Page Results</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{`${routes.length} items`}</strong>
                  </span>
                </>
              )}
            </Box>
            <Box sx={{display: {md: 'flex', xs: 'none'}}}>
              <Box mr={3}>
                <Dropdown
                  value={filterDropdownValue}
                  className={styles.search__dropdown__mobile}
                  title="Relevancy"
                  onChange={(e) => filterOrder(e)}
                  itens={filterDropdownItems}
                />
              </Box>
              <Box>
                <Dropdown
                  value={sectionDropdownValue}
                  className={styles.search__dropdown}
                  title="All"
                  isMulti
                  onChange={(e) => filterSections(e)}
                  itens={sectionDropdownItems}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{display: 'block'}}>
            {routes.map((route) => (
              <h5 className={styles.search__route}>
                {route.page.title[currentLanguage.languageTag]}
              </h5>
            ))}
          </Box>
          {showNotFoundText() && (
            <div className={styles.notFound}>
              <p>Sorry, there are no results for {searchTerm}.</p>
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
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.articles &&
                  posts.articles.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.articles.length)}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('white_papers') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>White Papers</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.white_papers ? posts.white_papers.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>{' '}
              <Grid container spacing={6}>
                {posts &&
                  posts.white_papers &&
                  posts.white_papers.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.white_papers.length)}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('videos') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Videos</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.videos ? posts.videos.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.videos &&
                  posts.videos.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.videos.length)}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('podcasts') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Podcasts</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.podcasts ? posts.podcasts.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.podcasts &&
                  posts.podcasts.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.podcasts.length)}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('webinar') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Webinars</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.webinar ? posts.webinar.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.webinar &&
                  posts.webinar.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.webinar.length)}
                      key={item._id}
                    >
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('newsletter') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Newsletters</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.newsletter ? posts.newsletter.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.newsletter &&
                  posts.newsletter.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <NewsletterCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('news') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>News</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.news ? posts.news.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.news &&
                  posts.news.map((item) => (
                    <Grid item xs={12} sm={6} md={handleCardSize(posts.news.length)} key={item._id}>
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('press_releases') && (
            <Box my={6}>
              <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <h3>Press Releases</h3>
                  <span className={styles.search__found}>
                    Found: <strong>{posts.press_releases ? posts.press_releases.length : 0}</strong>
                  </span>
                </Box>
                <Box>
                  <Button title="View more" redirectArrow variant="outlined" size="sm" />
                </Box>
              </Box>
              <Grid container spacing={6}>
                {posts &&
                  posts.press_releases &&
                  posts.press_releases.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.press_releases.length)}
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

Search.propTypes = {
  heading: PropTypes.string,
}

export default Search
