import {styled} from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import Box from '@mui/material/Box'
import SimpleBlockContent from '../../../SimpleBlockContent'
import styles from './CustomizedAccordion.module.css'
import CustomizedPostCard from '../../CustomizedPostCard/CustomizedPostCard'

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

export default function CustomizedAccordions(props) {
  const {items, languageTag} = props
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }


  return (
    <div>
      {items.map((item, index) => (
        <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <Typography sx={{fontWeight: 'bold', color: '#dc6e19'}} component="h2" variant="h6">
              {item.localeName[languageTag]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
           
              {item.contentBlock[languageTag].map((section) => (
                <div className={styles.simpleBlockContent}>
                   <SimpleBlockContent blocks={section} />
                </div>
               
                //  <Typography mt={2} mb={5} sx={{color: '#091b3f'}} component="h3" variant="h5">{section.title}</Typography>
                // {section.items.map((sectionItem) => (
                //   <Typography style={{fontSize: '18px'}} mb={2}>{sectionItem}</Typography>
                // ))}
              ))}
              <Grid container>
              {
                item.posts && item.posts.map((post) =>(
                  <Grid item md={4} pr={2} >
                    <CustomizedPostCard post={post} languageTag={languageTag}/>
                  </Grid>
                ))
              }
              </Grid>          
            
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
