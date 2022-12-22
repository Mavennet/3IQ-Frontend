import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import imageUrlBuilder from '@sanity/image-url'
import {Button, CardActions} from '@mui/material'
import SimpleBlockContent from '../../../../components/OldLayout/SimpleBlockContent'
import client from '../../../../client'
import {format, parseISO} from 'date-fns'
import styles from './CustomPostCard.module.css'
import Link from 'next/link'
import PropTypes from 'prop-types'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

export default function CustomPostCard(props) {
  const {
    languageTag,
    localeButtonText,
    localeShortDescription,
    post,
    route,
  } = props

  return (
    <Card
      className={styles.card}
      style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}
    >
      <div>
        <Link
          href={{
            pathname: '/LandingPage',
            query: {slug: route.slug.current},
          }}
          as={`/${route.slug.current}`}
        >
          <CardMedia
            sx={{cursor: 'pointer', maxHeight: {md: '110px'}}}
            component="img"
            image={urlFor(post.mainImage)}
            alt="green iguana"
          />
        </Link>
        <CardContent className={styles.cardContent}>
          <Link
            href={{
              pathname: '/LandingPage',
              query: {slug: route.slug.current},
            }}
            as={`/${route.slug.current}`}
          >
            <Typography
              sx={{
                color: '#0f4b7d',
                fontWeight: 'bold',
                fontSize: '18px',
                fontFamily: 'Europa',
                cursor: 'pointer',
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {post.localeHeading && post.localeHeading[languageTag]}
            </Typography>
          </Link>
          <div className={styles.simpleBlockContent}>
            <SimpleBlockContent
              blocks={localeShortDescription && localeShortDescription[languageTag]}
            />
          </div>
          {localeButtonText && (
            <Link
              href={{
                pathname: '/LandingPage',
                query: {slug: route.slug.current},
              }}
              as={`/${route.slug.current}`}
            >
              <Button className={styles.button} size="small" color="primary">
                {localeButtonText[languageTag]} »
              </Button>
            </Link>
          )}
        </CardContent>
      </div>
      <CardActions
        sx={{
          color: '#615e69',
          borderTop: '1px solid #eaeaea',
          fontSize: '14px',
          fontFamily: 'Europa',
        }}
      >
        {post.publishedAt && format(parseISO(post.publishedAt), 'MMMM d, yyyy')}
      </CardActions>
    </Card>
  )
}

CustomPostCard.propTypes = {
  languageTag: PropTypes.string,
  localeButtonText: PropTypes.object,
  localeShortDescription: PropTypes.object,
  post: PropTypes.object,
  route: PropTypes.object,
}
