import supportedLanguages from '../supportedLanguages';
import { LinkIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'route',
  type: 'document',
  title: 'Route',
  icon: LinkIcon,
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'page',
      type: 'reference',
      title: 'Page (*)',
      description: 'Select the page that this route should point to',
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      name: 'countries',
      title: 'Countries (*)',
      description: 'Choose one or more countries to display this content into',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select a country.'),
      ],
      of: [{type: 'reference', to: {type: 'country'}}],
    },
    {
      name: 'includeInSitemap',
      type: 'boolean',
      title: 'Include page in sitemap',
      description: 'For search engines. Will be added to /sitemap.xml',
    },
    {
      name: 'disallowRobots',
      type: 'boolean',
      title: 'Disallow in robots.txt',
      description: 'Hide this route for search engines',
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      pageTitle: `page.title.${baseLanguage.id}`,
      firstCountryName: `countries.0.name`,
      secondCountryName: `countries.1.name`,
      thirdCountryName: `countries.2.name`,
      fourthCountryName: `countries.3.name`,
      fifthCountryName: `countries.4.name`,  // By passing the countries names, it will be able to access them within prepare() without only receiving the reference _ref
    },
    prepare({ slug, pageTitle, firstCountryName = '', secondCountryName, thirdCountryName, fourthCountryName, fifthCountryName }) {
      let countryNames = firstCountryName;
      countryNames = secondCountryName ? countryNames.concat(', ' + secondCountryName) : countryNames;
      countryNames = thirdCountryName ? countryNames.concat(', ' + thirdCountryName) : countryNames;
      countryNames = fourthCountryName ? countryNames.concat(', ' + fourthCountryName) : countryNames;
      countryNames = fifthCountryName ? countryNames.concat(', ' + fifthCountryName) : countryNames;

      return {
        title: slug === '/' ? '/' : `/${slug}`,
        subtitle: `Page: ${pageTitle} - ${countryNames}`,
      }
    },
  },
}