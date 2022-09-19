import {styled} from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import Box from '@mui/material/Box'
import SimpleBlockContent from '../../../SimpleBlockContent'
import styles from './CustomAccordion.module.css'
import CustomPostCard from '../CustomPostCard/CustomPostCard'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

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
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
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
  const [expanded, setExpanded] = useState('panel1')

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Box>
      {items.map((item, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
        >
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <Typography sx={{fontWeight: 'bold', color: '#dc6e19'}} component="h2" variant="h6">
              {item.localeName[languageTag]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.localecontentBlock &&
              item.localecontentBlock[languageTag].map((section) => (
                <div className={styles.simpleBlockContent}>
                  <SimpleBlockContent blocks={section} />
                </div>
              ))}
            <Grid container alignItems="stretch">
              {item.newsCards &&
                item.newsCards.map((newsCard) => (
                  <Grid item style={{display: 'flex'}} pt={5} md={4} pr={2}>
                    <CustomPostCard {...newsCard} languageTag={languageTag} />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
