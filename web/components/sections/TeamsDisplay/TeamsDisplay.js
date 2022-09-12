import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Grid, Container, Typography, Modal, Box } from '@mui/material'
import MemberCard from './MemberCard/MemberCard'
import styles from './TeamsDisplay.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import SimpleBlockContent from '../../SimpleBlockContent'

const theme = createTheme()

function TeamsDisplay(props) {
  const { teams, currentLanguage } = props

  const [open, setOpen] = React.useState(false)
  const [memberSelected, setMemberSelected] = React.useState(null)

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
    maxHeight: '95%',
    bgcolor: '#fff',
    outline: 'none',
    overflowY: 'scroll',
    p: 2,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <Grid
          container
          mt={2}
        >
          <Grid xs={12} item sx={{ display: 'flex', justifyContent: 'center' }}>
            <ul className={styles.navTeam}>
              {
                teams.map((item) => {
                  return (
                    <li key={item._id}><a href={`#${item._id}`}>{item.localeName[currentLanguage.languageTag]}</a></li>
                  )
                })
              }
            </ul>
          </Grid>
        </Grid>
        {
          teams.map((item) => {
            return (
              <Grid
                id={item._id}
                container
                spacing={2}
                key={item._id}
                sx={{
                  color: 'white',
                  pt: 6,
                  pb: 6,
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h2"
                    mb={4}
                    sx={{
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      color: '#dc6e19',
                      fontWeight: '500',
                      fontSize: '22px'
                    }}
                  >
                    <strong>{item.localeName[currentLanguage.languageTag]}</strong>
                  </Typography>
                </Grid>
                {
                  item.members.map((item) => {
                    let showProfile = false
                    if (item.localeBio?.[currentLanguage.languageTag]) {
                      showProfile = true
                    }
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={item._id}
                        sx={{
                          cursor: item.localeBio[currentLanguage.languageTag] || item.email ? 'pointer' : ''
                        }}
                        onClick={item.localeBio[currentLanguage.languageTag] ? () => handleOpen(item) : null}
                      >
                        <MemberCard
                          name={item.name && item.name}
                          role={item.localeJobTitle[currentLanguage.languageTag] && item.localeJobTitle[currentLanguage.languageTag]}
                          image={item.profilePhoto.asset._ref && item.profilePhoto.asset._ref}
                          showProfileBox={showProfile}
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
              mb: 2,
              cursor: 'pointer'
            }}
          >
            <AiOutlineClose size={26} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MemberCard
                name={memberSelected?.name}
                role={memberSelected?.localeJobTitle[currentLanguage.languageTag]}
                image={memberSelected?.profilePhoto.asset._ref}
                linkedin={memberSelected?.linkedinUrl}
                showProfileBox={false}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={styles.simpleBlockContent}><SimpleBlockContent blocks={memberSelected?.localeBio[currentLanguage?.languageTag]} /></div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}

TeamsDisplay.propTypes = {
  teams: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default TeamsDisplay
