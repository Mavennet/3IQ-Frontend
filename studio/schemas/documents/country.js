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
      name: 'tag',
      type: 'string',
      title: 'Tag',
      description: 'IETF language tag with ISO 3166-1 country code, such as "en-US" or "pt-BR"',
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
