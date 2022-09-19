import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import Box from '@mui/material/Box'
import SimpleBlockContent from '../../../SimpleBlockContent'
import styles from './CustomTab.module.css'
import CustomPostCard from '../CustomPostCard/CustomPostCard'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {fontWeight, height, textTransform} from '@mui/system'

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default function CustomTab(props) {
  const {items, languageTag} = props
  const [value, setValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{style: {background: 'transparent', transition: 'none'}}}
          sx={{marginBottom: '-2px'}}
        >
          {items.map((item, index) => (
            <Tab
              style={{
                marginRight: '-2px',
                border: value == index && '2px solid #dc6e19',
                borderBottom: value == index && '2px solid white',
                fontFamily: 'Europa',
                fontSize: '20px',
                color: value == index ? '#dc6e19' : '#0082e5',
                fontWeight: 'bold',
                lineHeight: '32px',
                textTransform: 'none',
                padding: '20px',
                maxWidth: '200px',
                textAlign: 'left',
              }}
              label={item.localeName[languageTag]}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <TabPanel style={{border: '2px solid #dc6e19'}} value={value} index={index}>
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
        </TabPanel>
      ))}
    </Box>
  )
}
