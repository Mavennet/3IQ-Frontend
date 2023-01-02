import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Card, CardContent, CardMedia, Container, Grid, Box} from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
const builder = imageUrlBuilder(client)

function KeyBenefits(props) {
  const {title, benefits, currentLanguage} = props

  return (
    <Container maxWidth="lg">
      <h3>{title}</h3>
      <Grid container mt={5} mb={5}>
        {benefits.map((benefit, index) => (
          <Grid item md={12 / benefits.length} sm={12}>
            <Box
              sx={{p: 3, background: index % 2 == 0 ? '#0082E5' : '#1495F8'}}
              className={styles.text}
            >
              <Grid container>
                <Grid item md={2} xs={1}>
                  <Box
                    component="img"
                    src={builder.image(benefit.mainImage).url()}
                    sx={{
                      filter: 'brightness(0) invert(1)',
                      // justifyContent: 'center',
                      p: 0.5
                    }}
                  />
                </Grid>
                <Grid item md={10} xs={11} pl={3}>
                  <h5 className={styles.text__heading}>
                    {benefit.heading[currentLanguage?.languageTag]}
                  </h5>
                </Grid>
              </Grid>

              <p className={styles.text__body}>
                {benefit.text[currentLanguage?.languageTag] || ''}
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
    // <Container sx={{mb: 8.6}}>
    //   <Typography
    //     sx={{
    //       position: 'relative',
    //       fontWeight: 900,
    //       fontSize: 34,
    //       lineHeight: 'var(--font-title2-line-height)',
    //       textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
    //       margin: 0,
    //       padding: 0,
    //       pt: '1.5rem',
    //       mb: '1.5rem',
    //       color: '#0082E4',
    //     }}
    //     align={'left'}
    //     gutterBottom
    //   >
    //     {title}
    //   </Typography>
    //   <Grid container spacing={2.5}>
    //     {benefits.map((b) => (
    //       <Grid key={b._id} item xs={6} md={3}>
    //         <Card
    //           sx={{
    //             p: 2.5,
    //             backgroundColor: '#E8E8EA',
    //             height: '99%',
    //             display: 'flex',
    //             // gap: '25px',
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //           }}
    //         >
    //           <Typography
    //             align="center"
    //             sx={{
    //               fontSize: 28,
    //               lineHeight: 1,
    //               minHeight: {xs: '1em', md: '2em'},
    //               color: '#0082E4',
    //               fontWeight: 400,
    //               fontFamily: '"DM Serif Display", Sans-serif',
    //               wordBreak: 'break-word',
    //             }}
    //           >
    //             {b.heading[currentLanguage?.languageTag]}
    //           </Typography>
    //           <CardMedia
    //             component="img"
    //             src={builder.image(b.mainImage).url()}
    //             sx={{
    //               display: 'block',
    //               mx: 'auto',
    //               p: '20px',
    //               mb: 1.25,
    //               height: '90px',
    //               width: '90px',
    //               // justifyContent: 'center',
    //             }}
    //           />
    //           <CardContent align="center" sx={{padding: 0}}>
    //             <SimpleBlockContent
    //               blocks={b.body[currentLanguage?.languageTag]}
    //             ></SimpleBlockContent>
    //           </CardContent>
    //         </Card>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Container>
  )
}

KeyBenefits.propTypes = {
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.object,
      heading: PropTypes.object,
    })
  ),
  title: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default KeyBenefits
