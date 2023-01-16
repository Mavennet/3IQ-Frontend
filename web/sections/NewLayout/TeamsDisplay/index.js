import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Typography, Modal, Box } from '@mui/material'
import MemberCard from './MemberCard'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import HeroFirstVariation from '../HeroFirstVariation'
import { RiDoubleQuotesL } from 'react-icons/ri'
import styles from './styles.module.scss'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'

function TeamsDisplay(props) {

  const { name, description, teams, textCta, buttonCta, currentLanguage, backgroundImageCta, quotesText } = props

  const [open, setOpen] = React.useState(false)
  const [memberSelected, setMemberSelected] = React.useState(null)

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  const handleOpen = (member) => {
    setOpen(true)
    setMemberSelected(member)
  }

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

  return (
    <>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container mt={4}>
          <Grid xs={12} md={4}>
            <div className={styles.sticky__grid}>
              <h2>{name}</h2>
              {
                description && (
                  <div className={styles.simple__block__content}>
                    <SimpleBlockContent blocks={description} />
                  </div>
                )
              }
              <div className={styles.nav__team}>
                <ul>
                  {
                    teams.map((item) => {
                      return (
                        <li key={item._id}><a href={`#${item._id}`}>{item.localeName[currentLanguage.languageTag]}</a></li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={8}>
            {
              teams.map((item) => {
                return (
                  <Grid
                    id={item._id}
                    container
                    spacing={2}
                    key={item._id}
                    mb={4}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h2"
                        mb={2}
                        sx={{
                          color: 'var(--black)',
                          fontWeight: '300',
                          fontSize: 'var(--font-size-primary-md)',
                          fontFamily: 'var(--font-family-primary)'
                        }}
                      >
                        <strong>{item.localeName[currentLanguage.languageTag]}</strong>
                      </Typography>
                    </Grid>
                    {
                      item.isFounder ? item.members.map((item) => {
                        return (
                          <>
                            <Grid item xs={12} sm={6} md={8}>
                              <RiDoubleQuotesL
                                size={50}
                                color={'var(--light-blue)'}
                              />
                              {
                                quotesText && (
                                  <div className={styles.simple__block__content}>
                                    <SimpleBlockContent blocks={quotesText} />
                                  </div>
                                )
                              }
                              <Typography
                                variant="h3"
                                my={2}
                                sx={{
                                  fontFamily: 'var(--font-family-secondary)',
                                  color: 'var(--black)',
                                  fontSize: 'var(--font-size-secondary-lg)',
                                  fontWeight: 'var(--font-weight-regular)',
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="h4"
                                mb={2}
                                sx={{
                                  fontFamily: 'var(--font-family-secondary)',
                                  color: 'var(--black)',
                                  fontSize: 'var(--font-size-secondary-sm)',
                                  fontWeight: 'var(--font-weight-regular)',
                                }}
                              >
                                {item.localeJobTitle[currentLanguage.languageTag] && item.localeJobTitle[currentLanguage.languageTag]}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                              <div className={styles.imgGrid}>
                                {
                                  item.profilePhoto.asset._ref && (
                                    <Image
                                      src={urlFor(item.profilePhoto.asset._ref).url()}
                                      alt={item.name}
                                      layout='fill'
                                      objectFit='cover'
                                    />
                                  )
                                }
                              </div>
                            </Grid>
                          </>
                        )
                      }) : item.members.map((item) => {
                        return (
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            key={item._id}
                            onClick={item.localeBio ? () => handleOpen(item) : null}
                            sx={{ cursor: item.localeBio ? 'pointer' : '' }}
                          >
                            <MemberCard
                              name={item.name && item.name}
                              role={item.localeJobTitle[currentLanguage.languageTag] && item.localeJobTitle[currentLanguage.languageTag]}
                              image={item.profilePhoto.asset._ref && item.profilePhoto.asset._ref}
                              showProfileBox={false}
                              email={item.email && item.email}
                              readProfileText={item.readProfileText && item.readProfileText[currentLanguage.languageTag]}
                              contactText={item.contactText && item.contactText[currentLanguage.languageTag]}
                            />
                          </Grid>
                        )
                      })
                    }
                  </Grid>
                )
              })
            }
            <Grid container>
              <Grid item xs={12}>
                <HeroFirstVariation
                  heading={textCta}
                  firstButton={buttonCta}
                  secondButton={null}
                  currentLanguage={currentLanguage}
                  backgroundImage={backgroundImageCta}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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
            <Grid item xs={12} sm={4} md={3}>
              <MemberCard
                name={memberSelected?.name}
                role={memberSelected?.localeJobTitle[currentLanguage.languageTag] && memberSelected?.localeJobTitle[currentLanguage.languageTag]}
                image={memberSelected?.profilePhoto.asset._ref}
                linkedin={memberSelected?.linkedinUrl}
                contactText={memberSelected?.contactText?.[currentLanguage.languageTag] && memberSelected?.contactText?.[currentLanguage.languageTag]}
                showProfileBox={false}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <div className={styles.simple__block__content}><SimpleBlockContent blocks={memberSelected?.localeBio[currentLanguage?.languageTag]} /></div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

TeamsDisplay.propTypes = {
  name: PropTypes.string,
  description: PropTypes.object,
  quotesText: PropTypes.object,
  backgroundImageCta: PropTypes.object,
  textCta: PropTypes.object,
  buttonCta: PropTypes.object,
  teams: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TeamsDisplay
