import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import RenderSections from '../../../components/RenderSections'

function FundsContent(props) {
  const {
    currentLanguage,
    fundItems,
    isFixedWhenScroll,
    currentCountry,
    allRoutes,
    // allPosts,
    allBenefits,
    allItems,
    allTeams,
    allTimelines,
    allLocationsDisplays,
    allTabItems,
  } = props

  const containerRef = React.useRef(null)

  const handleArrow = (type) => {
    if (type === 'next') {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft + 300
    } else {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft - 300
    }
  }

  const createSection = (content) => {
    const contentWithDefaultLanguage = []
    content &&
      content.map((c) => contentWithDefaultLanguage.push({...c, currentLanguage, currentCountry}))
    return contentWithDefaultLanguage
  }

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' }, background: 'var(--background-color)' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ position: 'relative' }}>
            <div className={styles.arrow___left} onClick={() => handleArrow('prev')}>
              <SlArrowLeft size={20} />
            </div>
            <div className={styles.menu} ref={containerRef}>
              <ul>
                {fundItems &&
                  fundItems.map((item, i) => {
                    return (
                      <li key={i}>
                        <a href={`#section_${i}`}>{item.localeName[currentLanguage.languageTag]}</a>
                      </li>
                    )
                  })}
                <li>
                  <a href={`#`}>Ask 3iQ</a>
                </li>
              </ul>
            </div>
            <div className={styles.arrow___right} onClick={() => handleArrow('next')}>
              <SlArrowRight size={20} />
            </div>
          </Box>
        </Grid>
      </Grid>
      {fundItems &&
        fundItems.map((fundItem, index) => (
          <div key={`fundItem${index}`}>
            <Box
              id={`section_${index}`}
              sx={{ position: 'relative', bottom: '100px', scrollMarginTop: ['Trading Platforms', 'Plateformes'].includes(fundItem.localeName[currentLanguage.languageTag]) && '-300px' }}
            ></Box>
            <Grid container mt={4} spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={{ md: 6 }}>
                  {fundItem.fundSections && (
                    <RenderSections
                      sections={createSection(fundItem.fundSections)}
                      routes={allRoutes}
                      benefits={allBenefits}
                      items={allItems}
                      // posts={allPosts}
                      teams={allTeams}
                      timelines={allTimelines}
                      locationsDisplays={allLocationsDisplays}
                      tabItems={allTabItems}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
    </Container>
  )
}

FundsContent.propTypes = {
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  fundItems: PropTypes.fundItems,
  isFixedWhenScroll: PropTypes.bool,
  allRoutes: PropTypes.object,
  allBenefits: PropTypes.object,
  allItems: PropTypes.object,
  allPosts: PropTypes.object,
  allTeams: PropTypes.object,
  allTimelines: PropTypes.object,
  allLocationsDisplays: PropTypes.object,
  allTabItems: PropTypes.object,
}

export default FundsContent
