import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import client from '../../../client'
import {IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/io'
import groq from 'groq'
import Form from '../../../components/NewLayout/Form'
import Dropdown from '../../../components/NewLayout/Dropdown'
import Button from '../../../components/NewLayout/Button'
import {ROUTES_BY_TERM} from '../../../utils/groqQueries'

function Search(props) {
  const {heading, currentLanguage, currentCountry} = props
  const [sectionDropdownValue, setSectionDropdownValue] = useState([])
  const [routes, setRoutes] = useState([])

  console.log(props)

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
      name: 'webinars',
      label: 'Webinars',
      value: 'webinars',
    },
    {
      id: 7,
      name: 'newsletters',
      label: 'Newsletters',
      value: 'newsletters',
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

  const [sections, setSections] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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
    return sections.indexOf(section) >= 0 || sections.length == 0
  }

  async function search(){
    if (searchTerm.length == 3 || (searchTerm.length > 3 && (searchTerm.length - 3) % 3  == 0)
      ) {
        await client.fetch(ROUTES_BY_TERM,
          { term: searchTerm, urlTag: currentCountry.urlTag }).then(res => console.log(res))
      alert(searchTerm)
    }
  }

  useEffect(() => {
    search()
  }, [searchTerm])

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
      <Box bgcolor={'#f9f9f9'}>
        <Container maxWidth={'lg'}>
          <Box my={2}>
            <Form
              onChange={(e) => handleSearch(e)}
              placeholder={'Type in your search terms and press enter'}
            />
            <Grid container sx={{display: {sm: 'none', xs: 'block'}}} mt={1} spacing={2}>
              <Grid item xs={6}>
                <Dropdown className={styles.search__dropdown__mobile} title="Relevancy" />
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
              <h3>Page Results</h3>
              <span className={styles.search__found}>
                Found: <strong>3 Items</strong>
              </span>
            </Box>
            <Box sx={{display: {md: 'flex', xs: 'none'}}}>
              <Box mr={3}>
                <Dropdown className={styles.search__dropdown} title="Relevancy" />
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
          {showSection('articles') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Articles</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('white_papers') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>White Papers</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('videos') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Videos</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('podcasts') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Podcasts</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('webinars') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Webinars</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('newsletters') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Newsletters</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('news') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>News</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
            </Box>
          )}
          {showSection('press_releases') && (
            <Box my={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h3>Press Releases</h3>
                <span className={styles.search__found}>
                  Found: <strong>3 Items</strong>
                </span>
              </Box>
              <Box>
                <Button title="View more" variant="outlined" size="sm" />
              </Box>
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
