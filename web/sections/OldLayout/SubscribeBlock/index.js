import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, Container, Modal, Button, Box } from '@mui/material'
 import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from'./styles.module.scss'
import { AiOutlineClose } from 'react-icons/ai'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

function SubscribeBlock(props) {
  const {
    firstSubscribeDescription,
    firstSubscribeButtonText,
    firstSubscribeSrc,
    secondSubscribeDescription,
    secondSubscribeButtonText,
    secondSubscribeSrc,
    thirdSubscribeDescription,
    thirdSubscribeButtonText,
    thirdSubscribeSrc
  } = props

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container mb={10} py={7} sx={{ backgroundColor: '#E8E8EA' }}>
          {
            firstSubscribeDescription && (
              <Grid item xs={12} px={12} py={2}>
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={firstSubscribeDescription} />
                </div>
                {
                  firstSubscribeSrc && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(firstSubscribeSrc)}
                      sx={{
                        backgroundColor: '#092047',
                        textTransform: 'capitalize',
                        fontSize: '16px',
                        ':hover': {
                          bgcolor: ' #0082e5',
                        },
                      }}>
                      {firstSubscribeButtonText || 'Missing firstSubscribeButtonText'}
                    </Button>
                  )
                }
              </Grid>
            )
          }
          {
            secondSubscribeDescription && (
              <Grid item xs={12} px={12} py={2}>
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={secondSubscribeDescription} />
                </div>
                {
                  secondSubscribeSrc && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(secondSubscribeSrc)}
                      sx={{
                        backgroundColor: '#092047',
                        textTransform: 'capitalize',
                        fontSize: '16px',
                        ':hover': {
                          bgcolor: ' #0082e5',
                        },
                      }}>
                      {secondSubscribeButtonText || 'Missing secondSubscribeButtonText'}
                    </Button>
                  )
                }
              </Grid>
            )
          }
          {
            thirdSubscribeDescription && (
              <Grid item xs={12} px={12} py={2}>
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={thirdSubscribeDescription} />
                </div>
                {
                  thirdSubscribeSrc && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(thirdSubscribeSrc)}
                      sx={{
                        backgroundColor: '#092047',
                        textTransform: 'capitalize',
                        fontSize: '16px',
                        ':hover': {
                          bgcolor: ' #0082e5',
                        },
                      }}>
                      {thirdSubscribeButtonText || 'Missing thirdSubscribeButtonText'}
                    </Button>
                  )
                }
              </Grid>
            )
          }
        </Grid>
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
    </ThemeProvider>
  )
}

SubscribeBlock.propTypes = {
  firstSubscribeDescription: PropTypes.object,
  firstSubscribeButtonText: PropTypes.string,
  firstSubscribeSrc: PropTypes.string,
  secondSubscribeDescription: PropTypes.object,
  secondSubscribeButtonText: PropTypes.string,
  secondSubscribeSrc: PropTypes.string,
  thirdSubscribeDescription: PropTypes.object,
  thirdSubscribeButtonText: PropTypes.string,
  thirdSubscribeSrc: PropTypes.string,
}

export default SubscribeBlock
