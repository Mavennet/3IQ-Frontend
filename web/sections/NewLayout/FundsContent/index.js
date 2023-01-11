import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { Container, Grid, Box } from '@mui/material'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import RenderSections from '../../../components/RenderSections'
import SimpleBlockContent from '../../../components/OldLayout/SimpleBlockContent'
import Button from '../../../components/NewLayout/Button'
import { BsCurrencyBitcoin } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { RiGlobalLine } from 'react-icons/ri'
import { TbPlant } from 'react-icons/tb'
import Link from 'next/link'

function FundsContent(props) {
  const {
    currentLanguage,
    enableArrows,
    lastItem,
    fundItems,
    menuColor,
    showTitleSection,
    currentCountry,
    allRoutes,
    // allPosts,
    allBenefits,
    allItems,
    allTeams,
    allTimelines,
    allLocationsDisplays,
    allTabItems,
    isFixedWhenScroll,
  } = props

  const [scrollPosition, setScrollPosition] = useState(0)
  const [navFixed, setNavFixed] = useState(false)

  const fixedNavRef = React.useRef()
  const containerRef = React.useRef(null)

  const handleScroll = () => {
    const position = window.scrollY
    if (position <= 560) {
      setNavFixed(false)
    }
    setScrollPosition(position)
  }

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
      content.map((c) => contentWithDefaultLanguage.push({ ...c, currentLanguage, currentCountry }))
    return contentWithDefaultLanguage
  }

  const icons = {
    bitcoin: <BsCurrencyBitcoin color={'#fff'} size={50} />,
    ethereum: <FaEthereum color={'#fff'} size={50} />,
    global: <RiGlobalLine color={'#fff'} size={50} />,
    grow: <TbPlant color={'#fff'} size={50} />
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  React.useEffect(() => {
    if (scrollPosition) {
      if (scrollPosition >= fixedNavRef?.current?.offsetTop) {
        setNavFixed(true)
      } else {
        setNavFixed(false)
      }
    }
  }, [scrollPosition])

  const typesStyle = {
    lightBlue: styles.light__blue,
    darkBlue: styles.dark__blue,
    darkGray: styles.dark_gray,
  }

  const arrowStyle = {
    lightBlue: styles.arrow__light__blue,
    darkBlue: styles.arrow__dark__blue,
    darkGray: styles.arrow__dark__gray,
  }

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' }, background: 'var(--background-color)' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box ref={fixedNavRef} className={navFixed && isFixedWhenScroll && styles.fixedLayout} sx={{ position: 'relative' }}>
            {
              enableArrows && (
                <div className={`${styles.arrow___left} ${arrowStyle[menuColor]}`} onClick={() => handleArrow('prev')}>
                  <SlArrowLeft size={20} />
                </div>
              )
            }
            <div className={`${styles.menu} ${typesStyle[menuColor]}`} ref={containerRef}>
              <ul>
                {fundItems &&
                  fundItems.map((item, i) => {
                    return (
                      <li key={i}>
                        <a href={`#section_${i}`}>{item.localeName[currentLanguage.languageTag]}</a>
                      </li>
                    )
                  })}
                {
                  lastItem?.[currentLanguage.languageTag]?.route &&
                  lastItem?.[currentLanguage.languageTag].route?.slug &&
                  lastItem?.[currentLanguage.languageTag].route?.slug.current && (
                    <li>
                      <Link
                        href={{
                          pathname: '/LandingPage',
                          query: { slug: lastItem[currentLanguage.languageTag].route.slug.current },
                        }}
                        as={`/${lastItem[currentLanguage.languageTag].route.slug.current}`}
                      >
                        <a>{lastItem[currentLanguage.languageTag].title}</a>
                      </Link>
                    </li>
                  )
                }

              </ul>
            </div>
            {
              enableArrows && (
                <div className={`${styles.arrow___right} ${arrowStyle[menuColor]}`} onClick={() => handleArrow('next')}>
                  <SlArrowRight size={20} />
                </div>
              )
            }
          </Box>
        </Grid>
      </Grid>
      {fundItems &&
        fundItems.map((fundItem, index) => (
          <section id={`section_${index}`} key={`fundItem${index}`}>
            <Grid container mt={4} spacing={2} py={2}>
              {showTitleSection && (
                <Grid item xs={12} mb={4}>
                  <h2>{fundItem.localeName[currentLanguage.languageTag]}</h2>
                </Grid>
              )}
              {fundItem.products &&
                fundItem.products.map((product, index) => (
                  <Grid item xs={12} mb={4} md={fundItem.products.length === 1 ? 12 : 6} key={`product_${index}`}>
                    <Grid container>
                      <Grid item xs={12} my={0} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {product.productIcon && (
                          <div className={`${styles.icon} ${product.buttonColor ? styles[product.buttonColor] : styles.solid}`}>
                            {icons[product.productIcon]}
                          </div>
                        )}
                        <div className={styles.title__product}>
                          <h3>{product.localeName[currentLanguage.languageTag]}</h3>
                          <h5>
                            {product.codes && (
                              product.codes.map((code) => (
                                code + ', '
                              ))
                            )}
                          </h5>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className={styles.simple__block__content}>
                          {product.localeHighlights &&
                            product.localeHighlights[currentLanguage.languageTag] && (
                              <SimpleBlockContent
                                blocks={product.localeHighlights[currentLanguage.languageTag]}
                              />
                            )}
                        </div>
                        {fundItem.localeReadMoreText && (
                          <Button
                            route={product.readMoreRoute && product.readMoreRoute}
                            title={fundItem.localeReadMoreText[currentLanguage.languageTag]}
                            variant={product.buttonColor ? product.buttonColor : 'solid'}
                          />
                        )}
                      </Grid>
                      <Grid xs={12}>
                        {product.localeObservation && (
                          <p className={styles.observation}>{product.localeObservation[currentLanguage.languageTag]}</p>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
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
          </section>
        ))}
    </Container>
  )
}

FundsContent.propTypes = {
  enableArrows: PropTypes.bool,
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  fundItems: PropTypes.fundItems,
  menuColor: PropTypes.string,
  showTitleSection: PropTypes.bool,
  allRoutes: PropTypes.object,
  allBenefits: PropTypes.object,
  allItems: PropTypes.object,
  allPosts: PropTypes.object,
  allTeams: PropTypes.object,
  allTimelines: PropTypes.object,
  allLocationsDisplays: PropTypes.object,
  allTabItems: PropTypes.object,
  lastItem: PropTypes.object,
  isFixedWhenScroll: PropTypes.bool,
}

export default FundsContent
