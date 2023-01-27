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
import Card from '../../../components/NewLayout/Card'
import NewsletterCard from '../../../components/NewLayout/NewletterCard'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import Link from 'next/link'
import {IoIosArrowDropleft} from 'react-icons/io'

function Search(props) {
  const {
    heading,
    notFoundText,
    buttonText,
    articlesLabel,
    whitePapersLabel,
    videosLabel,
    podcastsLabel,
    webinarsLabel,
    newslettersLabel,
    newsLabel,
    pressReleasesLabel,
    currentLanguage,
    currentCountry,
  } = props

  const [sectionDropdownValue, setSectionDropdownValue] = useState([])
  const [filterDropdownValue, setFilterDropdownValue] = useState([])
  const [routes, setRoutes] = useState([])
  const [posts, setPosts] = useState(null)
  const [data, setData] = useState({})
  const [categories, setCategories] = useState([])
  const [sections, setSections] = useState([])
  const [singleSection, setSingleSection] = useState(null)

  const [searchTerm, setSearchTerm] = useState(null)

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const urlSearchTerm = urlParams.get('searchTerm')
  categories.length > 0 && urlSearchTerm && searchTerm == null && setSearchTerm(urlSearchTerm)

  function showNotFoundText() {
    let show = false
    let hasData = []
    posts && categories && categories.map((c) => hasData.push(posts[c].length > 0))
    show = !(hasData.indexOf(true) >= 0)
    return show
  }

  function filterQuantity(posts, quantity = 4) {
    let filteredPosts = singleSection ? posts : posts.slice(0, quantity)
    return filteredPosts
  }

  const localeArticlesLabel =
    (articlesLabel && articlesLabel[currentLanguage].languageTag) || 'Articles'
  const localeWhitePapersLabel =
    (whitePapersLabel && whitePapersLabel[currentLanguage].languageTag) || 'White Papers'
  const localeVideosLabel = (videosLabel && videosLabel[currentLanguage].languageTag) || 'Videos'
  const localePodcastsLabel =
    (podcastsLabel && podcastsLabel[currentLanguage].languageTag) || 'Podcasts'
  const localeWebinarsLabel =
    (webinarsLabel && webinarsLabel[currentLanguage].languageTag) || 'Webinars'
  const localeNewsletterLabel =
    (newslettersLabel && newslettersLabel[currentLanguage].languageTag) || 'Newsletters'
  const localeNewsLabel = (newsLabel && newsLabel[currentLanguage].languageTag) || 'News'
  const localePressReleasesLabel =
    (pressReleasesLabel && pressReleasesLabel[currentLanguage].languageTag) || 'Press Releases'

  const sectionDropdownItems = [
    {
      name: 'articles',
      label: localeArticlesLabel,
      value: 'articles',
    },
    {
      name: 'white_papers',
      label: localeWhitePapersLabel,
      value: 'white_papers',
    },
    {
      name: 'videos',
      label: localeVideosLabel,
      value: 'videos',
    },
    {
      name: 'podcasts',
      label: localePodcastsLabel,
      value: 'podcasts',
    },
    {
      name: 'webinar',
      label: localeWebinarsLabel,
      value: 'webinar',
    },
    {
      name: 'newsletter',
      label: localeNewsletterLabel,
      value: 'newsletter',
    },
    {
      name: 'news',
      label: localeNewsLabel,
      value: 'news',
    },
    {
      name: 'press_releases',
      label: localePressReleasesLabel,
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

  function renderHeader(title, section) {
    return (
      <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: {md: 'none', xs: 'flex'}, alignItems: 'center'}}>
          {singleSection && (
            <Box mt={1} mr={1.5}>
              <IoIosArrowDropleft
                onClick={() => setSingleSection(null)}
                className={styles.icon}
                size={30}
              />
            </Box>
          )}
          <h5>{title}</h5>
          <span className={styles.search__found__mobile}>
            Found: <strong>{posts[section] ? posts[section].length : 0}</strong> items
          </span>
        </Box>
        <Box sx={{display: {md: 'flex', xs: 'none'}, alignItems: 'center'}}>
          {singleSection && (
            <Box mt={1.2} mr={1.5}>
              <IoIosArrowDropleft
                onClick={() => setSingleSection(null)}
                className={styles.icon}
                size={35}
              />
            </Box>
          )}
          <h3>{title}</h3>
          <span className={styles.search__found}>
            Found: <strong>{posts[section] ? posts[section].length : 0}</strong> items
          </span>
        </Box>

        {!singleSection && (
          <Box>
            <Button
              title={(buttonText && buttonText[currentLanguage.languageTag]) || 'View More'}
              onClick={() => setSingleSection(section)}
              redirectArrow
              variant="outlined"
              size="xs"
            />
          </Box>
        )}
      </Box>
    )
  }

  async function search() {
    if (categories.length > 0) {
      // let webinars =
      if (
        searchTerm &&
        (searchTerm.length == 3 || (searchTerm.length > 3 && (searchTerm.length - 3) % 3 == 0))
      ) {
        await client
          .fetch(ROUTES_BY_TERM, {term: searchTerm, urlTag: currentCountry.urlTag})
          .then((res) => {
            setRoutes(res), console.log(res)
          })
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
  }, [searchTerm, filterDropdownValue])

  useEffect(() => {
    singleSection && setSections([singleSection])
  }, [singleSection])

  return (
    <>
      <Box pb={10} bgcolor={'#f9f9f9'}>
        <Container maxWidth={'lg'}>
          <Box py={2}>
            <Form
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              placeholder={'Type in your search terms and press enter'}
            />
            {!singleSection && (
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
            )}
          </Box>
          {!singleSection && (
            <>
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
                  <Link
                    href={{
                      pathname: '/LandingPage',
                      query: {slug: route.slug.current},
                    }}
                    as={`/${route.slug.current}`}
                  >
                    <h5 className={styles.search__route}>
                      {route.page.title[currentLanguage.languageTag]}
                    </h5>
                  </Link>
                ))}
              </Box>
            </>
          )}

          {showNotFoundText() && (
            <div className={styles.notFound} >
              <p>Sorry, there are no results for {searchTerm}.</p>
              <SimpleBlockContent blocks={notFoundText} />
            </div>
          )}
          {showSection('articles') && (
            <Box my={6}>
              {renderHeader('Articles', 'articles')}
              <Grid container spacing={6}>
                {posts &&
                  posts.articles &&
                  filterQuantity(posts.articles).map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={handleCardSize(posts.articles.length)}
                      key={item._id}
                    >
                      {singleSection ? (
                        <SearchCard {...item} currentLanguage={currentLanguage} />
                      ) : (
                        <Card {...item} currentLanguage={currentLanguage} />
                      )}
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('white_papers') && (
            <Box my={6}>
              {renderHeader('White Papers', 'white_papers')}
              <Grid container spacing={6}>
                {posts &&
                  posts.white_papers &&
                  filterQuantity(posts.white_papers, 2).map((item) => (
                    <Grid item xs={12} md={6} key={item._id}>
                      <Card {...item} imageLayout currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('videos') && (
            <Box my={6}>
              {renderHeader('Videos', 'videos')}
              <Grid container spacing={6}>
                {posts &&
                  posts.videos &&
                  filterQuantity(posts.videos, 2).map((item) => (
                    <Grid item xs={12} md={6} key={item._id}>
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('podcasts') && (
            <Box my={6}>
              {renderHeader('Podcasts', 'podcasts')}
              <Grid container spacing={6}>
                {posts &&
                  posts.podcasts &&
                  filterQuantity(posts.podcasts).map((item) => (
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
              {renderHeader('Webinars', 'webinar')}
              <Grid container spacing={6}>
                {posts &&
                  posts.webinar &&
                  filterQuantity(posts.webinar, 2).map((item) => (
                    <Grid item xs={12} md={6} key={item._id}>
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('newsletter') && (
            <Box my={6}>
              {renderHeader('Newsletters', 'newsletter')}
              <Grid container spacing={6}>
                {posts &&
                  posts.newsletter &&
                  filterQuantity(posts.newsletter, 3).map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <NewsletterCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('news') && (
            <Box my={6}>
              {renderHeader('News', 'news')}
              <Grid container spacing={6}>
                {posts &&
                  posts.news &&
                  filterQuantity(posts.news).map((item) => (
                    <Grid item xs={12} sm={6} md={handleCardSize(posts.news.length)} key={item._id}>
                      <SearchCard {...item} currentLanguage={currentLanguage} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
          {showSection('press_releases') && (
            <Box my={6}>
              {renderHeader('Press Releases', 'press_releases')}
              <Grid container spacing={6}>
                {posts &&
                  posts.press_releases &&
                  filterQuantity(posts.press_releases).map((item) => (
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
