import {styled} from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import React, {useState} from 'react'
import Box from '@mui/material/Box'
import SimpleBlockContent from '../../../SimpleBlockContent'
import styles from './CustomAccordion.module.css'
import CustomPostCard from '../CustomPostCard/CustomPostCard'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import PropTypes from 'prop-types'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  border: `2px solid #dc6e19`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({theme}) => ({
  backgroundColor: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '2px solid #dc6e19',
}))

export default function CustomAccordions(props) {
  const {items, languageTag} = props
  const [expanded, setExpanded] = useState('panel0')

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Box>
      {items.map((item, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
          key={`item_${index}`}
        >
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <Typography sx={{fontWeight: 'bold', color: '#dc6e19'}} component="h2" variant="h6">
              {item.localeName[languageTag]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.localecontentBlock &&
              item.localecontentBlock[languageTag].map((section, index) => (
                <div className={styles.simpleBlockContent} key={`section_${index}`}>
                  <SimpleBlockContent blocks={section} />
                </div>
              ))}
            <Grid container alignItems="stretch">
              {item.newsCards &&
                item.newsCards.map((newsCard, index) => (
                  <Grid item style={{display: 'flex'}} key={`newsCard_${index}`} pt={5} md={4} pr={2}>
                    <CustomPostCard {...newsCard} languageTag={languageTag} />
                  </Grid>
                ))}
            </Grid>
            <Grid
              py={5}
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {item.localeButton && item.localeButton[languageTag] && (
                <RedirectButton
                {...item.localeButton[languageTag]}
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: '#DC6E19',
                  borderColor: '#DC6E19',
                  color: '#fff',
                  fontWeight: '300',
                }}
              />
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

CustomAccordions.propTypes = {
  items: PropTypes.object,
  languageTag: PropTypes.string,
}
