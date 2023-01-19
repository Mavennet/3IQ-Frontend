import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Typography, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Image from 'next/image'
import groq from 'groq'

function WhatWeOffer(props) {

  const { name, benefitys, currentLanguage } = props

  const [members, setMembers] = React.useState([])

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  React.useEffect(() => {
    const fetchMember = async (ids) => {
      await client
        .fetch(
          groq`
        *[_type == 'benefity' && _id in $personId] {
          _id,
          _type,
          name,
          imageIcon,
          description
        }
       `,
          { personId: ids }
        )
        .then((response) => {
          setMembers(response)
        })
    }

    if (benefitys && members.length == 0) {
      let ids = []
      benefitys.forEach((benefity) => ids.push(benefity._ref))
      fetchMember(ids)
    }
  }, [])

  React.useEffect(() => {
    if (members) {
      console.log(members)
    }
  }, [members])

  return (
    <Box sx={{ background: '#ECECEC' }} py={12}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              mb={8}
              sx={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-primary-lg)',
                color: 'var(--black)',
                textAlign: 'center',
              }}
            >
              {name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={{xs: 2, md: 4}}>
          {
            members && members.map((item) => {
              return (
                <Grid item key={item._id} xs={12} md={4} mb={4}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <div className={styles.imgGrid}>
                        {
                          item.imageIcon && (
                            <Image
                              src={urlFor(item.imageIcon.asset._ref).url()}
                              alt={item.name[currentLanguage.languageTag]}
                              width={58}
                              height={58}
                            />
                          )
                        }
                      </div>
                    </Grid>
                    {
                      item.name && (
                        <Grid item xs={12}>
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: 'var(--font-family-primary)',
                              fontSize: 'var(--font-size-primary-md)',
                              color: 'var(--black)',
                            }}
                          >
                            {item.name[currentLanguage.languageTag]}
                          </Typography>
                        </Grid>
                      )
                    }
                    {
                      item.description && (
                        <Grid item xs={12}>
                          <Box className={styles.simple__block__content}>
                            <SimpleBlockContent blocks={item.description[currentLanguage.languageTag]} />
                          </Box>
                        </Grid>
                      )
                    }
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </Box>
  )
}

WhatWeOffer.propTypes = {
  name: PropTypes.string,
  benefitys: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default WhatWeOffer
