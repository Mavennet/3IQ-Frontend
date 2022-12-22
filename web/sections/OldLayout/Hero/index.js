import React from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Modal, Button, Box } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import RedirectButton from '../../../components/OldLayout/RedirectButton'
import { AiOutlineClose } from 'react-icons/ai'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h3: {
      fontSize: 50,
      fontWeight: 'bold'
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
})

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function Hero(props) {
  const {heading, description, backgroundImage, button, isSubscriptionSrcLink, isButtonReverse, currentLanguage } = props

  const [open, setOpen] = React.useState(false)
  const [iframeSelected, setIframeSelected] = React.useState(null)

  const handleOpen = (iframe) => {
    setOpen(true)
    setIframeSelected(iframe)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '60%', lg: '40%' },
    height: 'auto',
    maxWidth: '1024px',
    maxHeight: '95%',
    bgcolor: '#fff',
    outline: 'none',
    overflowY: 'scroll',
    border: '8px solid #091B3F',
    p: 2,
  };

  const localeButton = button && button[currentLanguage?.languageTag]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background:
          backgroundImage &&
          `url("${urlFor(backgroundImage)
            .url()}") no-repeat center center`,
        backgroundSize: 'cover',
          bgcolor: '#091b3f',
          pt: {lg: 12, xs: 8},
          pb: {lg: 18, xs: 14},
        }}
      >
        <Container sx={{ maxWidth: {sm: 'md', lg: 'lg'} }}>
          <Box sx={{p: '5 1', pr: 1, pl:{xs: 1}}}>
            <Box sx={{pt: 5, pr: {md: 30, sm: 10}, color: '#fff', align: 'left'}}>
              <Typography component="h1" variant="h3" style={{fontWeight: 'bold'}} gutterBottom>
                {heading}
              </Typography>
              <div className={styles.simpleBlockContent}>
                {description && <SimpleBlockContent blocks={description} />}
              </div>
            </Box>

            {isSubscriptionSrcLink && localeButton && localeButton.link ? (
              <Button
                variant="contained"
                onClick={() => handleOpen(localeButton.link)}
                sx={{
                  background: '#dc6e19',
                  border: '3px solid #dc6e19',
                  textTransform: 'none',
                  whiteSpace: 'normal',
                  display: 'block',
                  color: 'white',
                  '&:hover': {
                    background: 'none',
                    color: '#dc6e19',
                  },
                  mt: 8,
                  width: {xs: '100%', md: 'auto'},
                  padding: '8px 25px',
                  fontSize: '20px',
                  fontWeight: '400',
                }}
                >
                {localeButton.title || 'Missing button title'}
              </Button>
            ) :
              !isSubscriptionSrcLink && localeButton && (localeButton.route || localeButton.link) && (
                <RedirectButton
                {...localeButton}
                reverse={!!isButtonReverse}
                sx={{mt: 8, width: {xs: '100%', md: 'auto'}, padding: '8px 25px', fontSize: '20px', fontWeight: '400'}}
                ></RedirectButton>
            )}

          </Box>
        </Container>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box
              onClick={() => setOpen(false)}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 6,
                cursor: 'pointer'
              }}
            >
              <AiOutlineClose size={26} />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <iframe
                  src={iframeSelected}
                  width='100%'
                  height='350'
                  type='text/html'
                  frameBorder='0'
                  aria-label='newsletter subscription'
                  allowTransparency='true'
                >
                </iframe>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  backgroundImage: PropTypes.object,
  description: PropTypes.any,
  button: PropTypes.object,
  isSubscriptionSrcLink: PropTypes.bool,
  isButtonReverse: PropTypes.bool,
  currentLanguage: PropTypes.object,
}

export default Hero
