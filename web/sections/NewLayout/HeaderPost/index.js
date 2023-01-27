import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './styles.module.scss'
import client from '../../../client'
import { Grid, Typography, Box } from '@mui/material'
import { format } from 'date-fns'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import groq from 'groq'
import Link from 'next/link'

const builder = imageUrlBuilder(client)

function HeaderPost(props) {

  const { post, fatherCategory, currentLanguage, currentCountry } = props

  const [publishedDate, setPublishedDate] = React.useState('')
  const [categorie, setCategorie] = React.useState(null)

  currentCountry.urlTag === 'ae' && body.forEach(block => {
    if (block._type === 'block') {
      block.markDefs.length > 0 && block.markDefs.forEach(m => {
        if (m._type === 'link') {
          m.href = m.href.replace('https://3iq.ca', 'https://staging--3iq-ae-dev.netlify.app/ae')
        }
      })
    }
  })
  React.useEffect(() => {
    if (currentLanguage.languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post?.publishedAt)
      const isEng = currentLanguage.name === "EN"
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : "dd MMMM yyyy", { locale: getLocale(currentLanguage.languageTag.replace("_", "-")) })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [currentLanguage, post?.publishedAt])

  const fetchCategories = async (ref) => {
    await client
      .fetch(
        groq`
      *[_type == 'category' && _id == $categorieRef] {
        _id,
        _ref,
        name,
        searchId,
        description
      }[0]
     `,
        { categorieRef: ref }
      )
      .then((response) => {
        setCategorie(response)
      })
  }

  React.useEffect(() => {
    fetchCategories(post?.categories[0]?._ref)
  }, [])

  const shareHistoryText = currentCountry.shareThisStoryText && currentCountry.shareThisStoryText[currentLanguage.languageTag]

  return (
    <Grid
      container
      component="main"
      sx={{
        flexDirection: {
          xs: 'column-reverse',
          md: 'unset',
        },
      }}
    >
      <Grid item xs={12} md={6} sx={{ background: '#EBEBEB', position: 'relative' }} square>
        <Box
          sx={{
            mt: 2,
            mb: { xs: 0, md: 2 },
            ml: { xs: 2, md: 10 },
            mr: { xs: 0, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            color: '#091b3f',
          }}
        >
          <Grid container>
            <Grid item xs={12} mt={6}>
              {categorie?.name && (
                <Typography
                  my={2}
                  component="h2"
                  variant="h2"
                  sx={{
                    fontSize: 'var(--font-size-secondary-md)',
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--light-orange)',
                  }}
                >
                  {`${fatherCategory} / ${categorie?.name?.[currentLanguage.languageTag]}`}
                </Typography>
              )}
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontSize: 'var(--font-size-primary-lg)',
                  fontFamily: 'var(--font-family-primary),'
                }}
              >
                {post?.heading[currentLanguage.languageTag]}
              </Typography>
              {post?.author?.name && categorie?.name && (
                <Typography
                  my={2}
                  variant="h5"
                  sx={{
                    fontSize: 'var(--font-size-secondary-sm)',
                    fontFamily: 'var(--font-family-secondary)',
                    color: 'var(--black)',
                  }}
                >
                  <strong className={styles.blue}>
                    {categorie?.name?.[currentLanguage.languageTag] + ' '}
                  </strong>
                  by {post?.author?.name}
                </Typography>
              )}
            </Grid>
            {
              publishedDate && (
                <Grid item xs={12} my={2}>
                  <div className={styles.publishedAt}>
                    <Typography
                      component="h2"
                      variant="h2"
                      sx={{
                        fontWeight: 400,
                        fontSize: 'var(--font-size-secondary-md)',
                        fontFamily: 'var(--font-family-secondary)',
                        color: '#8E8E8E'
                      }}>
                      {publishedDate}
                    </Typography>
                  </div>
                </Grid>
              )
            }
            {
              shareHistoryText && (
                <Grid item xs={12} my={8}>
                  <Typography
                    component="h4"
                    variant="h4"
                    mb={2}
                    style={{
                      fontWeight: 600,
                      fontSize: 'var(--font-size-secondary-md)',
                      fontFamily: 'var(--font-family-secondary)',
                      color: 'var(--black)',
                      width: '100%'
                    }}>
                    {shareHistoryText}
                  </Typography>
                  <ul className={styles.social}>
                    <Link href={`http://twitter.com/share?text=${post?.heading[currentLanguage.languageTag]}&url=${window.location.href}`} color="inherit" target='_blank' rel="noopener">
                      <a>
                        <li>
                          <FaTwitter />
                        </li>
                      </a>
                    </Link>
                    <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post?.heading[currentLanguage.languageTag]}&summary=${post?.heading[currentLanguage.languageTag]}&source=LinkedIn`} color="inherit" target='_blank' rel="noopener">
                      <a>
                        <li>
                          <FaLinkedinIn />
                        </li>
                      </a>
                    </Link>
                  </ul>
                </Grid>
              )
            }
          </Grid>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
        >
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        py={{ xs: 28, md: 0 }}
        md={6}
        sx={{
          background:
            post?.mainImage &&
            `url("${builder.image(post?.mainImage).url()}") no-repeat center center`,
          backgroundSize: 'cover',
          bgcolor: '#091b3f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-end', md: 'center' },
          alignItems: 'center',
        }}
      >
      </Grid>
    </Grid>
  )
}

HeaderPost.propTypes = {
  post: PropTypes.object,
  fatherCategory: PropTypes.string,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
}

export default HeaderPost
