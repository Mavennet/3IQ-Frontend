import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import imageUrlBuilder from '@sanity/image-url'
import { CardActions } from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import client from '../../../../client'
import { format } from 'date-fns'
import Link from 'next/link'
import PropTypes from 'prop-types'
import RedirectButton from '../../../RedirectButton/RedirectButton'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

export default function CustomNewsletterCard(props) {
  const { languageTag, localeButtonText, localeShortDescription, post, route } = props

  const [publishedDate, setPublishedDate] = React.useState('')

  React.useEffect(() => {
    if (languageTag) {
      const getLocale = (locale) => require(`date-fns/locale/${locale}/index.js`)
      const newYears = new Date(post.publishedAt)
      const isEng = languageTag.startsWith('en')
      const formattedDate = format(newYears, isEng ? 'MMMM dd, yyyy' : 'dd MMMM yyyy', {
        locale: getLocale(languageTag.replace('_', '-')),
      })
      !isEng && formattedDate.toLocaleLowerCase('fr')
      setPublishedDate(formattedDate)
    }
  }, [languageTag, post.publishedAt])

  return (
    <Card
      style={{
        width: '100%',
        color: '#091b3f',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <div>
        <Link
          href={{
            pathname: `/${post.localeHeading && post.localeHeading[languageTag]}`,
            query: { slug: route.slug.current },
          }}
          as={`/${route.slug.current}`}
        >
          <a>
            {
              post.mainImage && (
                <CardMedia
                  sx={{ cursor: 'pointer', maxHeight: { md: '20vh' } }}
                  component="img"
                  image={urlFor(post.mainImage)}
                  alt="green iguana"
                />
              )
            }
          </a>
        </Link>
        <CardContent>
          <Link
            href={{
              pathname: '/LandingPage',
              query: { slug: route.slug.current },
            }}
            as={`/${route.slug.current}`}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                fontFamily: 'Europa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
                mb: 2,
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {post.localeHeading && post.localeHeading[languageTag]}
            </Typography>
          </Link>
          <div>
            <SimpleBlockContent
              blocks={localeShortDescription ? localeShortDescription[languageTag] : "Missing Heading Title"}
            />
          </div>
        </CardContent>
      </div>
      <CardActions
        sx={{
          color: '#615e69',
          fontSize: '14px',
          fontFamily: 'Europa',
          flexDirection: 'column',
          mb: 4,
        }}
      >
        {localeButtonText && (
          <Link
            href={{
              pathname: '/LandingPage',
              query: { slug: route.slug.current },
            }}
            as={`/${route.slug.current}`}
          >
            <RedirectButton
              title={localeButtonText[languageTag]}
              route={route}
              reverse
              sx={{
                width: { xs: '100%', md: '100%' },
                padding: '8px 15px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#dc6e19',
                height: 'auto',
                mb: 1,
                border: '2px solid #dc6e19',
                textAlign: 'center',
                '&:hover': {
                  background: 'none',
                },
              }}
            ></RedirectButton>
          </Link>
        )}
        <Typography sx={{ alignSelf: 'flex-start' }}>
          {post.publishedAt && publishedDate}
        </Typography>
      </CardActions>
    </Card>
  )
}

CustomNewsletterCard.propTypes = {
  languageTag: PropTypes.string,
  localeButtonText: PropTypes.object,
  localeShortDescription: PropTypes.object,
  post: PropTypes.object,
  route: PropTypes.object,
}
