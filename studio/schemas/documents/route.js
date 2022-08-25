import { LinkIcon } from '@sanity/icons'

export default {
  name: 'route',
  type: 'document',
  title: 'Route',
  icon: LinkIcon,
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'page',
      type: 'reference',
      description: 'Select the page that this route should point to',
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'page',
        },
      ],
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
    {
      name: 'countries',
      title: 'Countries',
      description: 'Choose one or more countries to display this content into',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select a country.'),
      ],
      of: [{type: 'reference', to: {type: 'country'}}],
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      pageTitle: 'page.title',
      country0: 'countries.0.name',
    },
    prepare({ slug, pageTitle, country0 }) {
      const subtitle = country0 ? country0 : 'None'
      return {
        title: slug === '/' ? '/' : `/${slug}`,
        subtitle: `Page: ${pageTitle} - ${subtitle}`,
      }
    },
  },
}
