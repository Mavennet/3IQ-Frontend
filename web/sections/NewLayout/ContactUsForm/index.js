import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../client'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {RiMailSendLine} from 'react-icons/ri'
import {BiTime, BiGlobe, BiPhone} from 'react-icons/bi'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import styles from './styles.module.scss'
import {LOCATIONS} from '../../../utils/groqQueries'
import ReactCountryFlag from 'react-country-flag'
import Button from '../../../components/NewLayout/Button'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
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

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function ContactUsForm(props) {
  const {
    heading,
    contactUsFormSrc,
    mainImage,
    email,
    phoneNumber,
    schedule,
    description,
    currentLanguage,
    locations,
  } = props

  const [filteredLocations, setFilteredLocations] = useState(null)

  const fetchLocations = async () => {
    let dataRefs = []
    let filteredLocations = []
    locations.map((l) => dataRefs.push(l._ref))
    await client.fetch(LOCATIONS, {locationIds: dataRefs}).then((res) => filteredLocations = res)
    filteredLocations = filteredLocations.sort((a, b) => a.isMetaverse - b.isMetaverse)
    setFilteredLocations(filteredLocations)
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <Grid container>
      <Grid item md={6} xs={12} order={{md: 1, xs: 2}}>
        <Grid
          item
          md={12}
          sx={{
            height: '500px',
            width: '100%',
            background: mainImage && `url("${urlFor(mainImage).url()}") no-repeat center center`,
            backgroundSize: 'cover',
            bgcolor: 'var(--orange)',
            display: {md: 'block', xs: 'none'},
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: '500px',
            width: '100%',
            bgcolor: 'var(--orange)',
          }}
        >
          <div className={styles.stripes}>
            <div className={styles.stripe} />
            <div className={styles.stripe} />
            <div className={styles.stripe} />
          </div>
          <Grid container xs={12} mt={5}>
            <Grid item md={3} sm={false} />

            {filteredLocations &&
              filteredLocations.length > 0 &&
              filteredLocations.map((fl) => (
                <Grid item md={3} sm={4} xs={6} pl={2} pt={3}>
                  <Box className={styles.countries}>
                    <Box sx={{display: 'flex'}}>
                      {fl && fl.mainImage && (
                        <Box
                          // component="img"
                          sx={{
                            width: '24px',
                            height: '24px',
                            mr: 1,
                            border: '2px solid white',
                            borderRadius: '50%',
                            background: `url(${urlFor(fl.mainImage.asset._ref).url()}) #fff`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          alt={fl.mainImage.alt}
                          src={urlFor(fl.mainImage.asset._ref).url()}
                        />
                      )}
                      <h5>{fl.localeName[currentLanguage.languageTag]}</h5>
                    </Box>
                    <SimpleBlockContent
                      blocks={fl.localeDescription[currentLanguage.languageTag]}
                    />
                    {fl.redirectLink && (
                      <Button
                        className={styles.redirectLink}
                        title={fl.redirectLink[currentLanguage.languageTag].title}
                        link={fl.redirectLink[currentLanguage.languageTag].link}
                        size="xs"
                        variant="outlined"
                        redirectArrowLeft={fl.isMetaverse}
                        map={!fl.isMetaverse}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12} order={{md: 2, xs: 1}} sx={{height: '960px'}}>
        <Grid container pt={5} pl={{md: 11, xs: 2}} sx={{height: '200px'}}>
          <Grid item xs={12}>
            <h3>{heading}</h3>
            <span>{description}</span>
          </Grid>
          <Grid item container xs={12}></Grid>
          <Grid item container md={4} xs={12}>
            <Grid item xs={1} md={2} pt={0.5}>
              <RiMailSendLine />
              <br />
              <BiPhone />
            </Grid>
            <Grid item xs={10}>
              <span className={styles.info}>{email}</span>
              <br />
              <span className={styles.info}>{phoneNumber}</span>
            </Grid>
          </Grid>
          <Grid item container md={4} xs={12}>
            <Grid item xs={1} md={2} pt={0.5}>
              <BiTime />
            </Grid>
            <Grid item xs={10}>
              <span className={styles.info}>{schedule}</span>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{height: '800px'}} pl={{md: 10, sm: 2}} pr={{md: 10, sm: 2}}>
          <iframe
            style={{width: '100%', height: '100%', border: 'none'}}
            name="my_iframe"
            src={contactUsFormSrc}
          ></iframe>
        </Box>
      </Grid>
    </Grid>
    // <ThemeProvider theme={theme}>
    //   <Grid container>
    //     <CssBaseline />
    //     <Grid
    //       item
    //       container
    //       md={6}
    //       xs={12}
    //       order={{md: 1, xs: 2}}
    //       sx={{
    //         bgcolor: 'var(--orange)',
    //       }}
    //     >
    //       <Grid
    //         item
    //         md={12}
    //         sx={{
    //           height: '500px',
    //           width: '100%',
    //           background: mainImage && `url("${urlFor(mainImage).url()}") no-repeat center center`,
    //           backgroundSize: 'cover',
    //           bgcolor: '#091b3f',
    //         }}
    //       ></Grid>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         sx={{
    //           height: '420px',
    //           color: 'white',
    //         }}
    //       >
    //         <Grid xs={12}>
    //           <div className={styles.stripes}>
    //             <div className={styles.stripe} />
    //             <div className={styles.stripe} />
    //             <div className={styles.stripe} />
    //           </div>
    //         </Grid>
    //         <Grid md={4} xs={false} sx={{height: '100%'}}></Grid>
    //         <Grid md={8} xs={12} sx={{height: '100%'}} pl={{xs: 8, md: 0}}>
    //           <Box className={styles.description} mt={10}>
    //             {description && <SimpleBlockContent blocks={description} />}
    //           </Box>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item md={6} xs={12} order={{md: 2, xs: 1}} sx={{height: '960px'}}>
    //       <Box className={styles.heading} pt={5} sx={{height: '200px', textAlign: 'center'}}>
    //         {heading && <SimpleBlockContent blocks={heading} />}
    //       </Box>
    //       <Box sx={{height: '800px'}} pl={{md: 10, sm: 2}} pr={{md: 10, sm: 2}}>
    //         <iframe
    //           style={{width: '100%', height: '100%', border: 'none'}}
    //           name="my_iframe"
    //           src={contactUsFormSrc}
    //         ></iframe>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </ThemeProvider>
  )
}

ContactUsForm.propTypes = {
  heading: PropTypes.object,
  contactUsFormSrc: PropTypes.object,
  mainImage: PropTypes.object,
  description: PropTypes.object,
  currentLanguage: PropTypes.object,
}

export default ContactUsForm
