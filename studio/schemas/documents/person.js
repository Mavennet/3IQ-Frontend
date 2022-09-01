import { UsersIcon } from '@sanity/icons'

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: UsersIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Bio (*)',
      validation: Rule => Rule.error('Information required.').required(),
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    }
  }
}
