import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {Container, Box, Grid} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import client from '../../../client'
import {IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/io'
import groq from 'groq'

function TeamsVideoDisplay(props) {
  const {heading, description, secondDescription, teams, currentLanguage} = props

  console.log(teams)

  const [members, setMembers] = useState([])
  const [memberSelected, setMemberSelected] = useState(0)

  function selectMember(position) {
    if (position == 'prev') {
      if (memberSelected != 0) {
        setMemberSelected(memberSelected - 1)
      } else {
        setMemberSelected(members.length - 1)
      }
    }

    if (position == 'next') {
      if (memberSelected != members.length - 1) {
        setMemberSelected(memberSelected + 1)
      } else {
        setMemberSelected(0)
      }
    }
  }

  useEffect(() => {
    const fetchMember = async (ids) => {
      await client
        .fetch(
          groq`
        *[_type == 'person' && _id in $personId] {
          _id,
          _type,
          name,
          jobTitle,
          bio,
          youtubeVideo,
          profilePhoto,
          linkedinUrl,
          email,
          contactText,
          readProfileText,
        }
       `,
          {personId: ids}
        )
        .then((response) => {
          setMembers(response)
        })
    }

    if (teams && members.length == 0) {
      let ids = []
      teams.forEach((member) => ids.push(member._ref))
      fetchMember(ids)
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          background: '#008C86',
          display: {xs: 'block', md: 'none'},
        }}
      >
        <Container sx={{maxWidth: {lg: 'lg'}}}>
          <Grid container>
            <Grid item xs={12}>
              <Box className={styles.content} py={3}>
                <SimpleBlockContent blocks={description} />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <div className={styles.stripes}>
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
        </div>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Box className={styles.content} py={3}>
                <SimpleBlockContent blocks={secondDescription} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          background: {
            md: 'linear-gradient(90deg, #008C86 50%, var(--background-color) 50%)',
            xs: 'var(--background-color)',
          },
        }}
      >
        <Container sx={{maxWidth: {lg: 'lg'}}}>
          <Grid container>
            <Grid item md={4} bgcolor="#008C86" sx={{display: {md: 'block', xs: 'none'}}}>
              <Box className={styles.content} p={{md: 6, sm: 2}}>
                <SimpleBlockContent blocks={description} />
              </Box>

              <div className={styles.stripes}>
                <div className={styles.stripe} />
                <div className={styles.stripe} />
                <div className={styles.stripe} />
              </div>
              <Box className={styles.content} p={{md: 6, sm: 2}}>
                <SimpleBlockContent blocks={secondDescription} />
              </Box>
            </Grid>
            <Grid
              item
              sm={12}
              md={8}
              p={{md: 6}}
              pt={{md: 6, sm: 2, xs: 5}}
              bgcolor={'var(--background-color)'}
            >
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>{heading}</h3>
                <Box className={styles.arrows} sx={{display: {xs: 'none', sm: 'block'}}}>
                  <IoIosArrowDropleft size={40} onClick={() => selectMember('prev')} />
                  <IoIosArrowDropright size={40} onClick={() => selectMember('next')} />
                </Box>
              </Box>
              <Box
                my={2}
                pt={{md: 2, xs: 1}}
                sx={{width: '100%', height: {md: '400px', sm: '350px', xs: '200px'}}}
              >
                {members[memberSelected]?.youtubeVideo && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={members[memberSelected].youtubeVideo}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
              </Box>
              <Grid container spacing={2}>
                {members.map((member, index) => (
                  <Grid item sm={3} xs={6}>
                    <Box onClick={() => setMemberSelected(index)} className={styles.member}>
                      <p
                        className={`${styles.member__name} ${
                          memberSelected == index && styles.member__active
                        }`}
                      >
                        {member.name}
                      </p>
                      <p
                        className={`${styles.member__job} ${
                          memberSelected == index && styles.member__active
                        }`}
                      >
                        {member.jobTitle[currentLanguage.languageTag]}
                      </p>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

TeamsVideoDisplay.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.object,
  teams: PropTypes.array,
  secondDescription: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TeamsVideoDisplay
