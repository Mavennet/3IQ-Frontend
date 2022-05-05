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
    }
  ]
}
