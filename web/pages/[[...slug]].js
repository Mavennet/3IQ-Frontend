import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import {NextSeo} from 'next-seo'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import client from '../client'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSections'
import {getSlugVariations, slugParamToPath} from '../utils/urls'

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

export const getServerSideProps = async ({params}) => {

  const dataCountries = await client.fetch(
    groq`
    *[_type == "country"]{
      name,
      urlTag,
      languages[]->
    }
  `
  )

  const countries = []

  dataCountries.map(c => countries.push(c.urlTag))

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
      .then((res) => (res?.frontpage ? {...res.frontpage, slug} : undefined))
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
          {possibleSlugs: getSlugVariations(country, slug), country: country}
        )
        .then((res) => (res?.page ? {...res.page, slug} : undefined))
    } else {
      data = await client
        .fetch(
          // Get the route document with one of the possible slugs for the given requested path
          groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
          page-> {
            ${pageFragment}
          }
        }`,
          {possibleSlugs: getSlugVariations(country, slug)}
        )
        .then((res) => (res?.page ? {...res.page, slug} : undefined))
    }
  }

  if (!data?._type === 'page') {
    return {
      notFound: true,
    }
  }

  // get all countries available


  return {
    props: {...data, dataCountries, currentCountry: country} || {},
  }
}

const builder = imageUrlBuilder(client)

const LandingPage = (props) => {
  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    config = {},
    slug,
    dataCountries,
    currentCountry,
  } = props
  
  const [country] = useState(
    currentCountry
      ? dataCountries.filter((country) => country.urlTag === currentCountry)[0]
      : dataCountries.filter((country) => country.urlTag === 'ca')[0]
  )

  const [currentLanguage, setCurrentLanguage] = useState(country.languages[0])

  const switchLanguage = (lang) => {
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
    const contentWithDefaultLanguage = []
    content && content.map((c) => contentWithDefaultLanguage.push({...c, currentLanguage}))
    setFormatedContent(contentWithDefaultLanguage)
    config &&
      setFormatedConfig({
        ...config,
        switchLanguage,
        dataCountries,
        currentCountry: country,
        currentLanguage,
      })
  }, [currentLanguage])

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

  return (
    <Layout config={formatedConfig}>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${config.title}`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      />
      {formatedContent && <RenderSections sections={formatedContent} />}
    </Layout>
  )
}

LandingPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  disallowRobots: PropTypes.bool,
  openGraphImage: PropTypes.any,
  content: PropTypes.any,
  config: PropTypes.any,
  dataCountries: PropTypes.array,
  currentCountry: PropTypes.string,
}

export default LandingPage
