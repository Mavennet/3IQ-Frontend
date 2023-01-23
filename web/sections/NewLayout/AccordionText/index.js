import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import groq from 'groq'
import client from '../../../client'

function AccordionText(props) {
  const { accordionItem, currentLanguage } = props

  const [itens, setItens] = React.useState([])

  React.useEffect(() => {
    const fetchAccordion = async (ids) => {
      await client
        .fetch(
          groq`
        *[_type == 'accordionItem' && _id in $accordionId] | order(priority asc) {
          _id,
          name,
          description
        }
       `,
          { accordionId: ids }
        )
        .then((response) => {
          setItens(response)
        })
    }

    if (accordionItem && itens.length == 0) {
      let ids = []
      accordionItem.forEach((item) => ids.push(item._ref))
      console.log(ids)
      fetchAccordion(ids)
    }
  }, [])

  const renderIcon = () => {
    return (
      <div className={`${styles.icon} ${'icon-expand'}`}>
        <MdOutlineKeyboardArrowDown size={30} />
      </div>
    )
  }

  console.log(accordionItem)
  console.log(itens)

  return (
    <Container sx={{ maxWidth: { sm: 'md', md: 'lg' } }}>
      <Grid container py={10}>
        <Grid xs={12}>
          {
            itens.map((item) => {
              return (
                <Accordion
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                    borderBottom: 'none',
                    marginBottom: 4,
                    '&:before': {
                      display: 'none',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={renderIcon()}
                    aria-controls={item._id}
                    id={item._id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      "&.Mui-expanded .icon-expand ": {
                        background: 'var(--light-blue)',
                        color: 'var(--white)',
                        borderColor: 'var(--light-blue)'
                      },
                      "&.Mui-expanded .MuiTypography-root ": {
                        color: 'var(--light-blue)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: { xs: 'var(--font-size-primary-sm)', md: 'var(--font-size-primary-md)' },
                        color: 'var(--black)',
                        ml: 3
                      }}
                    >
                      {item.name[currentLanguage.languageTag] && item.name[currentLanguage.languageTag]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {
                      item.description[currentLanguage.languageTag] && (
                        <div className={styles.simple__block__content}>
                          <SimpleBlockContent blocks={item.description[currentLanguage.languageTag]} />
                        </div>
                      )
                    }
                  </AccordionDetails>
                </Accordion>
              )
            })
          }
        </Grid>
      </Grid>
    </Container>
  )
}

AccordionText.propTypes = {
  accordionItem: PropTypes.array,
  currentLanguage: PropTypes.object
}

export default AccordionText
