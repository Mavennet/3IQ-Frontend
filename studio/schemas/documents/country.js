import { EarthAmericasIcon } from '@sanity/icons'

export default {
  name: 'country',
  type: 'document',
  title: 'Country',
  icon: EarthAmericasIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'urlTag',
      type: 'string',
      title: 'URL Tag',
      description: 'Tag for the URL internationalization, such as "us", "ca", "fr" or "br".',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{type: 'reference', to: {type: 'language'}}],
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      description: 'Select pages for the top menu',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items'),
      ],
      type: 'array',
      of: [
        {
          title: 'Menu item',
          type: 'reference',
          to: [{ type: 'menuItem' }],
        },
      ],
    },
  ]
}
