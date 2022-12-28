import imageUrlBuilder from '@sanity/image-url'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import client from '../client'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSections'
import { getSlugVariations, slugParamToPath } from '../utils/urls'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import { BENEFIT_CARDS, DATA_COUNTRIES, DATA_EQUALS_SLUG, DATA_IN_SLUG, DATA_IN_SLUG_BY_PATH, FUND_ITEMS, ITEMS, LOCATIONS_DISPLAY, ROUTES, TAB_ITEMS, TEAMS, TIMELINES, FUND_CARDS } from '../utils/groqQueries'

export const getServerSideProps = async ({ params }) => {

  const dataCountries = await client.fetch(
    DATA_COUNTRIES
  )

  const countries = []

  dataCountries.map((c) => countries.push(c.urlTag))

  const country = 'ca'

  if (params?.slug) {
    if (countries.indexOf(params.slug[0]) >= 0) {
      params.slug.shift()
    }
  }

  const slug = slugParamToPath(params?.slug)

  let data

  // Frontpage - fetch the linked `frontpage` from the global configuration document.

  // Regular route
  if (country) {
    if (slug === 'home') {
      data = await client
        .fetch(
          // Get the route document with the home slug for the given country
          DATA_EQUALS_SLUG,
          { possibleSlug: `${country}/home`, country: country }
        )
        .then((res) => (res?.page ? { ...res.page, slug } : undefined))
    } else {
      data = await client
        .fetch(
          // Get the route document with one of the possible slugs for the given requested path
          DATA_IN_SLUG,
          { possibleSlugs: getSlugVariations(country, slug), country: country }
        )
        .then((res) => (res?.page ? { ...res.page, slug } : undefined))
    }
  } else {
    data = await client
      .fetch(
        // Get the route document with one of the possible slugs for the given requested path
        DATA_IN_SLUG_BY_PATH,
        { possibleSlugs: getSlugVariations(country, slug) }
      )
      .then((res) => (res?.page ? { ...res.page, slug } : undefined))
  }


  if (!data?._type === 'page') {
    return {
      notFound: true,
    }
  }

  // Retrieve all routes (used later on to get the buttons routes)
  const allRoutes = await client.fetch(ROUTES)
  // Retrieve all benefit cards (used later on to get the cards details in section)
  const allBenefitCards = await client.fetch(BENEFIT_CARDS)
  const allItems = await client.fetch(ITEMS)
  // Retrieve all teams (used later on to get the our team display blocks)
  const allTeams = await client.fetch(TEAMS)
  // Retrieve all timelines (used later on to get the Our Story timeline items)
  const allTimelines = await client.fetch(TIMELINES)
  // Retrieve all Locations Display sections (used to retrieve the section locations with necessary info)
  const allLocationsDisplays = await client.fetch(LOCATIONS_DISPLAY)
  // Retrieve all Tab Items
  const allTabItems = await client.fetch(TAB_ITEMS)
  // Retrieve all Fund Items
  const allFundItems = await client.fetch(FUND_ITEMS)
  // Retrieve all Fund Cards
  const allFundCards = await client.fetch(FUND_CARDS)


  // Retrieve all posts (used later on to get the news cards details)
  // const allPosts = await client.fetch(
  //   groq`
  //   *[_type == 'post'] {
  //     ...,
  //     author->
  //   }
  //   `
  // )
  // console.log('allPosts', Buffer.byteLength(JSON.stringify(allPosts), 'utf8'))
  //
  // Routes filtered by the current country (can be used if necessary)
  // const countryRoutes = allRoutes.filter(route => route.slug.current.startsWith(country));

  return {
    props:
      {
        ...data,
        dataCountries,
        currentCountry: country,
        allRoutes,
        // allPosts,
        allBenefitCards,
        allItems,
        allTeams,
        allTimelines,
        allLocationsDisplays,
        allTabItems,
        allFundItems,
        allFundCards
      } || {},
  }
}

let areCookiesEnabled = false

const builder = imageUrlBuilder(client)

const LandingPage = (props) => {
  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    content = null,
    config = {},
    slug,
    dataCountries,
    currentCountry,
    allRoutes,
    // allPosts,
    allBenefitCards,
    allItems,
    allTeams,
    allTimelines,
    allLocationsDisplays,
    allTabItems,
    allFundItems,
    allFundCards
  } = props

  const router = useRouter()
  const getLanguageFromStorage = () => {
    const languageStorage = localStorage.getItem('lang')
    const languageSelected = country.languages.filter(
      (language) => language.languageTag === languageStorage
    )
    if (languageSelected.length > 0) {
      return languageSelected[0]
    } else {
      localStorage.setItem('lang', country.languages[0].languageTag)
      return country.languages[0]
    }
  }

  const [country] = useState(
    currentCountry
      ? dataCountries.filter((country) => country.urlTag === currentCountry)[0]
      : dataCountries.filter((country) => country.urlTag === 'ca')[0]
  )

  const [currentLanguage, setCurrentLanguage] = useState(
    typeof window !== 'undefined' && localStorage.getItem('lang')
      ? getLanguageFromStorage()
      : country.languages[0]
  )

  const switchLanguage = (lang) => {
    localStorage.setItem('lang', lang.languageTag)
    setCurrentLanguage(lang)
  }

  const [formatedContent, setFormatedContent] = useState([])
  const [formatedConfig, setFormatedConfig] = useState({
    ...config,
    switchLanguage,
    dataCountries,
    currentCountry: country,
    currentLanguage,
  })

  useEffect(() => {
    if (content) {
      const contentWithDefaultLanguage = []
      content &&
        content.map((c) =>
          contentWithDefaultLanguage.push({ ...c, currentLanguage, currentCountry: country })
        )
      setFormatedContent(contentWithDefaultLanguage)
      config &&
        setFormatedConfig({
          ...config,
          switchLanguage,
          dataCountries,
          currentCountry: country,
          currentLanguage,
        })
    } else {
      router.replace(`/${country.urlTag}/home`)
    }
  }, [currentLanguage, config, content, country, dataCountries])

  const openGraphImages = openGraphImage
    ? [
      {
        url: builder.image(openGraphImage).width(800).height(600).url(),
        width: 800,
        height: 600,
        alt: title,
      },
      {
        // Facebook recommended size
        url: builder.image(openGraphImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: title,
      },
      {
        // Square 1:1
        url: builder.image(openGraphImage).width(600).height(600).url(),
        width: 600,
        height: 600,
        alt: title,
      },
    ]
    : []

  const localeTitle =
    title && currentLanguage.languageTag && title[currentLanguage.languageTag]
      ? title[currentLanguage?.languageTag]
      : 'Title not filled on the corresponding language for this page'
  const localeDescription =
    description && currentLanguage.languageTag && description[currentLanguage.languageTag]
      ? description[currentLanguage?.languageTag]
      : 'Description not filled on the corresponding language for this page'

  return (
    content && (
      <Layout config={formatedConfig}>
        <NextSeo
          title={localeTitle}
          titleTemplate={`%s | ${config.title}`}
          description={localeDescription}
          canonical={config.url && `${config.url}/${slug}`}
          openGraph={{
            images: openGraphImages,
          }}
          noindex={disallowRobots}
        />
        {formatedContent && (
          <RenderSections
            routes={allRoutes}
            benefits={allBenefitCards}
            items={allItems}
            // posts={allPosts}
            teams={allTeams}
            timelines={allTimelines}
            locationsDisplays={allLocationsDisplays}
            tabItems={allTabItems}
            fundItems={allFundItems}
            fundCards={allFundCards}
            sections={formatedContent}
          />
        )}
        {!areCookiesEnabled && (
          <CookieConsent
            enableDeclineButton
            style={{
              backgroundColor: "#0f4b7d",
            }}
            buttonStyle={{ backgroundColor: '#3ab667', color: '#fff', fontWeight: 'lighter' }}
            buttonText={currentLanguage?.name === 'FR' ? 'Accepter les cookies' : 'Accept cookies'}
            declineButtonText={currentLanguage?.name === 'FR' ? 'Refuser' : 'Deny'}
            onDecline={() => {
              areCookiesEnabled = false
              Object.keys(Cookies.get()).forEach(function (cookieName) {
                const neededAttributes = {
                  // Here you pass the same attributes that were used when the cookie was created
                  // and are required when removing the cookie
                };
                Cookies.remove(cookieName, neededAttributes);
              });
            }}
            onAccept={() => { areCookiesEnabled = true }}>
            {currentLanguage?.name === 'FR' ? 'Nous utilisons des cookies nécessaires pour optimiser notre site Web et notre service.' : 'This website uses the necessary cookies to enhance the user experience.'}
          </CookieConsent>
        )}
      </Layout>
    )
  )
}

LandingPage.propTypes = {
  title: PropTypes.object,
  description: PropTypes.object,
  slug: PropTypes.string,
  disallowRobots: PropTypes.bool,
  openGraphImage: PropTypes.any,
  content: PropTypes.any,
  config: PropTypes.any,
  dataCountries: PropTypes.array,
  currentCountry: PropTypes.string,
  allRoutes: PropTypes.any,
  // allPosts: PropTypes.any,
  allTeams: PropTypes.any,
  allTimelines: PropTypes.any,
  allLocationsDisplays: PropTypes.any,
  allTabItems: PropTypes.any,
  allFundItems: PropTypes.any,
  allFundCards: PropTypes.any,
  allBenefitCards: PropTypes.any,
  allItems: PropTypes.any,
}

export default LandingPage
