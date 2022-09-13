import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import { NextSeo } from 'next-seo'
import { useRouter } from "next/router"
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import client from '../client'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSections'
import { getSlugVariations, slugParamToPath } from '../utils/urls'

const pageFragment = groq`
...,
  content[] {
    _type == 'reference' => @->,
  }`

/**
 * Fetches data for our pages.
 *
 * The [[...slug]] name for this file is intentional - it means Next will run this getServerSideProps
 * for every page requested - /, /about, /contact, etc..
 * From the received params.slug, we're able to query Sanity for the route coresponding to the currently requested path.
 */

export const getServerSideProps = async ({ params }) => {
  const dataCountries = await client.fetch(
    groq`
    *[_type == "country"]{
      name,
      urlTag,
      mainNavigation[]-> {
      ...,
      route-> { ..., 'localeTitle': page->title },
      submenuRoutes[]-> { ..., 'localeTitle': page->title },
    },
      languages[]->,
      headerLogo,
      footerLogo,
      footerNavigation[]-> { ..., 'localeTitle': page->title },
      footerFirstLeftBlockContent,
      footerFirstLeftBlockImage,
      footerSecondLeftBlockContent,
      footerSecondLeftBlockImage,
      footerSecondLeftBlockButton,
      footerBottomContent,
      newsletterBody,
      newsletterSubscribeSrc,
      followUsText,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
    }
  `
  )

  const countries = []

  dataCountries.map((c) => countries.push(c.urlTag))

  let country = ''

  if (params?.slug) {
    if (countries.indexOf(params.slug[0]) >= 0) {
      country = params.slug[0]
      params.slug.shift()
    }
  }
  const slug = slugParamToPath(params?.slug)

  let data

  // Frontpage - fetch the linked `frontpage` from the global configuration document.
  if (slug === '/') {
    data = await client
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ${pageFragment}
          }
        }
      `
      )
      .then((res) => (res?.frontpage ? { ...res.frontpage, slug } : undefined))
  } else {
    // Regular route
    if (country) {
      data = await client
        .fetch(
          // Get the route document with one of the possible slugs for the given requested path
          groq`*[_type == "route" && slug.current in $possibleSlugs && $country in countries[]->urlTag][0]{
          page-> {
            ${pageFragment}
          }
        }`,
          { possibleSlugs: getSlugVariations(country, slug), country: country }
        )
        .then((res) => (res?.page ? { ...res.page, slug } : undefined))
    } else {
      data = await client
        .fetch(
          // Get the route document with one of the possible slugs for the given requested path
          groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
          page-> {
            ${pageFragment}
          }
        }`,
          { possibleSlugs: getSlugVariations(country, slug) }
        )
        .then((res) => (res?.page ? { ...res.page, slug } : undefined))
    }
  }

  if (!data?._type === 'page') {
    return {
      notFound: true,
    }
  }

  // Retrieve all routes (used later on to get the buttons routes)
  const allRoutes = await client.fetch(
    groq`
    *[_type == 'route'] {...}
    `
  )

  // Retrieve all posts (used later on to get the news cards details)
  const allPosts = await client.fetch(
    groq`
    *[_type == 'post'] {
      ...,
      author->
    }
    `
  )

  // Retrieve all teams (used later on to get the our team display blocks)
  const allTeams = await client.fetch(
    groq`
    *[_type == 'team'] {
      _id,
      _type,
      'localeName': name,
      members[]-> {
        _id,
        _type,
        name,
        'localeJobTitle': jobTitle,
        'localeBio': bio,
        profilePhoto,
        linkedinUrl,
        email,
        contactText,
        readProfileText,
      },
      countries[]-> {_id},
    }
    `
  )

  // Retrieve all timelines (used later on to get the Our Story timeline items)
  const allTimelines = await client.fetch(
    groq`
    *[_type == 'timeline'] {
      _id,
      _type,
      _rev,
      backgroundImage,
      leftFirstTextBlock,
      leftSecondTextBlock,
      items[]-> {
        _id,
        _type,
        'localeDateText': dateText,
        'localeDescriptionText': descriptionText
      },
    }
    `
  )

  // Retrieve all Locations Display sections (used to retrieve the section locations with necessary info)
  const allLocationsDisplays = await client.fetch(
    groq`
    *[_type == 'locationsDisplay'] {
      _id,
      _type,
      _rev,
      locations[]-> {
        _id,
        _type,
        'localeName': name,
        'localeDescription': description,
        googleMapsSrc,
        mainImage,
      }
    }
    `
  )

  // Routes filtered by the current country (can be used if necessary)
  // const countryRoutes = allRoutes.filter(route => route.slug.current.startsWith(country));

  return {
    props: { ...data, dataCountries, currentCountry: country, allRoutes, allPosts, allTeams, allTimelines, allLocationsDisplays } || {},
  }
}

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
    allPosts,
    allTeams,
    allTimelines,
    allLocationsDisplays,
  } = props

  const router = useRouter()

  const getLanguageFromStorage = () => {
    const languageStorage = localStorage.getItem('lang')
    const languageSelected = country.languages.filter((language) => language.languageTag === languageStorage)
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
      content && content.map((c) => contentWithDefaultLanguage.push({ ...c, currentLanguage }))
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

  const localeTitle = (title && currentLanguage.languageTag && title[currentLanguage.languageTag]) ? title[currentLanguage?.languageTag] : 'Title not filled on the corresponding language for this page'
  const localeDescription = (description && currentLanguage.languageTag && description[currentLanguage.languageTag]) ? description[currentLanguage?.languageTag] : 'Description not filled on the corresponding language for this page'

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
        {formatedContent && <RenderSections routes={allRoutes} posts={allPosts} teams={allTeams} timelines={allTimelines} locationsDisplays={allLocationsDisplays} sections={formatedContent} />}
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
  allPosts: PropTypes.any,
  allTeams: PropTypes.any,
  allTimelines: PropTypes.any,
  allLocationsDisplays: PropTypes.any,
}

export default LandingPage
