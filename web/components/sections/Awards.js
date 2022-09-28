import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Container } from '@mui/material'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SimpleBlockContent from '../SimpleBlockContent'
const builder = imageUrlBuilder(client)

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    h1: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    h5: {
      verticalAlign: 'middle',
      fontSize: '14px',
    },
    p: {
      fontSize: 16,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '15px 40px',
          fontFamily: 'Europa',
          fontSize: '20px',
          background: '#DC6E19',
          color: '#fff',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            border: 'none',
            color: '#fff!important',
            textDecoration: 'underline!important',
            textUnderlineOffset: '10px!important',
            fontWeight: '900',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      .simpleBlockContent {
        padding: 0px 20px;
      }
      
      .simpleBlockContent p {
        font-family: 'Europa';
        font-size: 14px
      }
      
      .simpleBlockContent a {
        font-family: 'Europa';
        color: #fff;
        text-decoration: none;
      }
      
      .simpleBlockContent a:hover {
        text-decoration: underline;
      }`,
    },
  },
})

function Awards(props) {
  const { images, heading, video, description } = props
  console.log(heading)
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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        sx={{
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
        <Typography
          sx={{
            position: 'relative',
            fontWeight: 600,
            fontSize: 34,
            lineHeight: 'var(--font-title2-line-height)',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: 0,
            padding: 0,
            pt: '1.5rem',
            mb: '1.5rem',
            color: '#0082E4',
          }}
          align={'left'}
          gutterBottom
        >
          {heading}
        </Typography>

        <Box
          component="img"
          src={builder.image(video).url()}
          key={video._key}
          sx={{
            mx: 'auto',
            maxWidth: { xs: '95%', lg: '50%' },
            display: 'block',
            p: '10px',
            mb: 1.25,
            // maxHeight: '300px',
            // marginLeft: {xs: '12%', md: '0'},
            // justifyContent: 'center',
          }}
        />
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
        <SimpleBlockContent blocks={description}></SimpleBlockContent>
        {/* <>
          <div className="quoteyeah" height="228">
            <div data-qmod-tool="quotehead" data-qmod-params='{"symbol":"BTCQ"}' className="qtool"></div>
          </div>
          <script id="qmod" type="application/javascript" src="https://qmod.quotemedia.com/js/qmodLoader.js"
            data-qmod-wmid="104183" data-qmod-env="app" async></script>
        </> */}
      </Container>
    </ThemeProvider>
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
