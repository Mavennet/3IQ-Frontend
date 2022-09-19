import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import imageUrlBuilder from '@sanity/image-url'
import {Button, CardActionArea, CardActions} from '@mui/material'
import SimpleBlockContent from '../../../SimpleBlockContent'
import client from '../../../../client'
import {format, parseISO} from 'date-fns'
import styles from './CustomPostCard.module.css'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

export default function CustomPostCard(props) {
  const {
    isNewsCardsHorizontalLayout,
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
        <CardMedia
          sx={{cursor: 'pointer'}}
          component="img"
          image={urlFor(post.mainImage)}
          alt="green iguana"
        />
        <CardContent className={styles.cardContent}>
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
          <div className={styles.simpleBlockContent}>
            <SimpleBlockContent
              blocks={localeShortDescription && localeShortDescription[languageTag]}
            />
          </div>
          {localeButtonText && (
            <Button className={styles.button} size="small" color="primary">
              {localeButtonText[languageTag]}
            </Button>
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
