import React from 'react'
import PropTypes from 'prop-types'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import client from '../../../client'
import YouTube from 'react-youtube'
import groq from 'groq'
import MemberCard from '../../NewLayout/TeamsDisplay/MemberCard'
import { AiOutlineClose } from 'react-icons/ai'
import { Container, Grid, Box, Modal } from '@mui/material'
import Button from '../../../components/NewLayout/Button'

function HeroNft(props) {
  const {
    heading,
    description,
    secondHeading,
    secondDescription,
    videoSrc,
    button,
    currentLanguage,
    member
  } = props

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
    <div className={styles.container}>
      <div className={styles.left__side}>
        <Box
          bgcolor={'#0082E5'}
          py={6}
          px={{ md: 6 }}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--white)'
          }}>
          <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
            <Grid container>
              <Grid item xs={12}>
                <h1 className={styles.heading}>{heading}</h1>
                <div className={styles.simpleBlockContent}>
                  {description && <SimpleBlockContent blocks={description} />}
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          py={6}
          px={{ md: 6 }}
          bgColor={'#F2F2F2'}
          sx={{
            width: '100%',
            color: 'var(--black)',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
            <Grid container>
              <Grid item xs={12}>
                <h1 className={styles.heading}>{secondHeading}</h1>
                <div className={styles.simpleBlockContent}>
                  {secondDescription && <SimpleBlockContent blocks={secondDescription} />}
                </div>
                {localeButton && (
                  <Box mb={4} sx={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => setOpen(true)}>
                    <Button
                      variant="solidOrange"
                      {...localeButton}
                      title={localeButton.title}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <div className={styles.right__side}>
        {videoSrc && (
          <div className={styles.nft}>
            <YouTube videoId={videoSrc} opts={opts} />
          </div>
        )}
      </div>
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
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                  <MemberCard
                    name={memberSelected?.name}
                    role={memberSelected?.jobTitle[currentLanguage.languageTag]}
                    image={memberSelected?.profilePhoto.asset._ref}
                    linkedin={memberSelected?.linkedinUrl}
                    contactText={memberSelected?.contactText[currentLanguage.languageTag]}
                    showProfileBox={false}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <div className={styles.simple__block__content}><SimpleBlockContent blocks={memberSelected?.bio[currentLanguage?.languageTag]} /></div>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )
      }
    </div>
  )
}

HeroNft.propTypes = {
  heading: PropTypes.object,
  description: PropTypes.arrayOf(PropTypes.object),
  secondHeading: PropTypes.object,
  secondDescription: PropTypes.arrayOf(PropTypes.object),
  videoSrc: PropTypes.string,
  button: PropTypes.object,
  currentLanguage: PropTypes.object,
  videoDescription: PropTypes.object,
  member: PropTypes.object,
}

export default HeroNft
