import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '../../../components/NewLayout/Button'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import { Typography, Modal } from '@mui/material'
import YouTube from 'react-youtube'
import groq from 'groq'
import MemberCard from '../../NewLayout/TeamsDisplay/MemberCard'
import { AiOutlineClose } from 'react-icons/ai'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function TextSection(props) {
  const { heading, text, videoSrc, button, currentLanguage, backgroundImage, isButtonCentralized, isGrayBackground, videoDescription, member } = props

  const localeButton = button && button[currentLanguage?.languageTag]

  const [memberSelected, setMemberSelected] = React.useState()
  const [open, setOpen] = React.useState(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '90%' },
    height: 'auto',
    maxWidth: '1024px',
    maxHeight: { xs: '100vh', md: '85vh' },
    bgcolor: 'var(--light-gray)',
    outline: 'none',
    overflowY: 'scroll',
    p: 2,
  };

  const opts = {
    width: '100%',
    height: '520',
    margin: '10px',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      playlist: videoSrc
    }
  };

  const fetchMember = async () => {
    await client.fetch(
      groq`
      *[_type == 'person' && _id == $personId] {
        _id,
        _type,
        name,
        jobTitle,
        bio,
        profilePhoto,
        linkedinUrl,
        email,
        contactText,
        readProfileText,
      }[0]
     `,
      { personId: member[0]._ref }
    )
      .then((response) => {
        setMemberSelected(response)
      })
  }

  React.useEffect(() => {
    if (member) {
      fetchMember()
    }
  }, [member])

  return (
    <Box sx={{
      background:
        backgroundImage &&
        `url("${urlFor(backgroundImage)
          .url()}") no-repeat center center`,
      backgroundSize: 'cover',
      bgcolor: backgroundImage ? '#091b3f' : 'transparent',
    }}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Box>
          <Grid container>
            <Grid item sm={videoSrc ? 8 : 12} xs={12}>
              <Box sx={{ pt: 5, pr: videoSrc && { md: 20, sm: 0 }, align: 'left' }}>
                {heading && (
                  <Typography
                    component="h2"
                    variant="h4"
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-primary-lg)',
                      color: 'var(--black)',
                      mb: 4
                    }}>
                    {heading}
                  </Typography>
                )}
                <div style="width: 100%; height: auto">
                  <iframe width="100%" height="715" src="https://www.youtube.com/embed/CAOzw3Z5-a8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div style={{ background: isGrayBackground && '#e8e8ea', padding: 30 }}>
                  {text && (
                    <Grid className={styles.textSection} container spacing={2}>
                      <div className={styles.simple__block__content}>
                        <SimpleBlockContent blocks={text} />
                      </div>
                    </Grid>
                  )}
                </div>
                {localeButton && (
                  <Box mb={4} sx={{ display: 'flex', justifyContent: isButtonCentralized ? 'center' : 'flex-start' }} onClick={() => setOpen(true)}>
                    <Button
                      variant="solidOrange"
                      {...localeButton}
                      title={localeButton.title}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            {videoSrc && (
              <Grid item md={4} sm={12} xs={12} sx={{ bgColor: '#000' }}>
                <Box
                  sx={{
                    position: { md: 'absolute', xs: 'relative' },
                    width: { xl: '20%', lg: '30%' },
                    top: { md: '300px' },
                    mt: { md: 5, xs: 5 },
                  }}
                  ml={{ md: 5 }}
                >
                  <YouTube videoId={videoSrc} opts={opts} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
      {
        memberSelected && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }
            }}
          >
            <Box sx={modalStyle}>
              <Box
                onClick={() => setOpen(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  my: 2,
                  cursor: 'pointer',
                }}
              >
                <AiOutlineClose size={32} />
              </Box>
              <Grid container spacing={3} py={4}>
                <Grid item xs={12} md={3}>
                  <MemberCard
                    name={memberSelected?.name}
                    role={memberSelected?.jobTitle[currentLanguage.languageTag]}
                    image={memberSelected?.profilePhoto.asset._ref}
                    linkedin={memberSelected?.linkedinUrl}
                    contactText={memberSelected?.contactText[currentLanguage.languageTag]}
                    showProfileBox={false}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <div className={styles.simple__block__content}><SimpleBlockContent blocks={memberSelected?.bio[currentLanguage?.languageTag]} /></div>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )
      }
    </Box>
  )
}

TextSection.propTypes = {
  heading: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  backgroundImage: PropTypes.object,
  isButtonCentralized: PropTypes.bool,
  isGrayBackground: PropTypes.bool,
  videoDescription: PropTypes.object,
  member: PropTypes.object,
}

export default TextSection
