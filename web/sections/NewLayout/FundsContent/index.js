import React from 'react'
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
    lastItem,
    fundItems,
    isLightBlueLayout,
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
      content.map((c) => contentWithDefaultLanguage.push({ ...c, currentLanguage, currentCountry }))
    return contentWithDefaultLanguage
  }

  const icons = {
    bitcoin: <BsCurrencyBitcoin color={'#fff'} size={50} />,
    ethereum: <FaEthereum color={'#fff'} size={50} />,
    global: <RiGlobalLine color={'#fff'} size={50} />,
    grow: <TbPlant color={'#fff'} size={50} />
  }

  return (
    <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' }, background: 'var(--background-color)' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ position: 'relative' }}>
            {
              !isLightBlueLayout && (
                <div className={styles.arrow___left} onClick={() => handleArrow('prev')}>
                  <SlArrowLeft size={20} />
                </div>
              )
            }
            <div className={`${styles.menu} ${isLightBlueLayout ? styles.light__blue : styles.dark__blue}`} ref={containerRef}>
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
                  lastItem?.[currentLanguage.languageTag].route &&
                  lastItem?.[currentLanguage.languageTag].route.slug &&
                  lastItem?.[currentLanguage.languageTag].route.slug.current && (
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
                {console.log(lastItem)}
              </ul>
            </div>
            {
              !isLightBlueLayout && (
                <div className={styles.arrow___right} onClick={() => handleArrow('next')}>
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
                <Grid item xs={12}>
                  <h2>{fundItem.localeName[currentLanguage.languageTag]}</h2>
                </Grid>
              )}
              {fundItem.products &&
                fundItem.products.map((product, index) => (
                  <Grid item xs={12} md={fundItem.products.length === 1 ? 12 : 6} key={`product_${index}`}>
                    <Grid container>
                      <Grid item xs={12} my={4} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
  currentLanguage: PropTypes.object,
  currentCountry: PropTypes.object,
  fundItems: PropTypes.fundItems,
  isLightBlueLayout: PropTypes.bool,
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
}

export default FundsContent
