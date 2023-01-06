import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Container, Grid, Box, Typography } from '@mui/material'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'

const builder = imageUrlBuilder(client)

function Awards(props) {
  const { images, heading, video, description, lineImageDesktop, lineImageMobile, bgColor } = props

  const settings = {
    arrows: true,
    dots: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <FaChevronLeft color="#DC6E19" />,
    nextArrow: <FaChevronRight color="#DC6E19" />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className={styles.full__width}>
      <Box sx={{ background: bgColor ? bgColor : 'linear-gradient(77deg, rgba(247,145,4,1) 0%, rgba(255,171,55,1) 49%, rgba(255,171,55,1) 100%)' }}>
        <Container>
          <Grid container py={8} sx={{ position: 'relative' }}>
            {
              lineImageDesktop && (
                <Box
                  className={styles.lines}
                  component="img"
                  alt={'lines'}
                  src={builder.image(lineImageDesktop).url()}
                  sx={{display: {xs: 'none', md: 'block'}}}
                />
              )
            }
            {
              lineImageMobile && (
                <Box
                  className={styles.lines}
                  component="img"
                  alt={'lines'}
                  src={builder.image(lineImageMobile).url()}
                  sx={{display: {xs: 'block', md: 'none'}}}
                />
              )
            }
            <Grid item xs={12} md={8} mt={10} my={8}>
              <div className={styles.video}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: '300',
                    color: '#EBEBEB',
                    fontSize: { xs: '50px', md: '131px' },
                    fontFamily: 'var(--font-family-primary)',
                    position: 'absolute',
                    top: { xs: '-40px', md: '-80px' },
                    left: { xs: '0', md: '-40px' },
                  }}
                >
                  {heading}
                </Typography>
                <Box
                  component="img"
                  src={builder.image(video).url()}
                  key={video._key}
                  sx={{
                    width: '100%',
                  }}
                />
              </div>
              <div className={styles.simple__block__content}>
                <SimpleBlockContent blocks={description}></SimpleBlockContent>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ background: 'var(--gray)' }}>
        <Container
          sx={{
            paddingTop: '80px',
            '& .slick-slider': {
              mb: 8,
              '& .slick-dots': {
                '& .slick-active button:before': {
                  color: '#DC6E19',
                  opacity: '1',
                },
                '& li button:before': {
                  color: '#DC6E19',
                  opacity: '0.2',
                },
                '& li': {
                  mx: 0,
                },
              },
              '& .slick-list': {
                '& .slick-track': {
                  // height: '40px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '12px',
                  '& .slick-slide': {
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'stretch',
                    height: 'inherit',
                    // px: 1.5,
                  },
                },
              },
            },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Slider {...settings}>
                {images &&
                  images.map((image) => {
                    return (
                      image.asset && (
                        <Box
                          component="img"
                          alt={image.alt}
                          src={builder.image(image).url()}
                          key={image._key}
                          sx={{
                            // m: '5px',
                            // pr: '20px',
                            maxWidth: '220px',
                            maxHeight: '300px',
                            // marginLeft: {xs: '12%', md: '0'},
                            // justifyContent: 'center',
                          }}
                        />
                      )
                    )
                  })}
              </Slider>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

Awards.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      _key: PropTypes.string,
      asset: PropTypes.shape({
        _ref: PropTypes.string,
      }),
    })
  ),
  lineImageDesktop: PropTypes.object,
  lineImageMobile: PropTypes.object,
  bgColor: PropTypes.string,
  video: PropTypes.shape({
    alt: PropTypes.string,
    _key: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string,
    }),
  }),
  description: PropTypes.object,
  heading: PropTypes.object,
}

export default Awards
