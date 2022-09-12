import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'descriptionsWithButton',
  title: 'Descriptions with Button',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'firstDescription',
      type: 'localePortableText',
      title: 'First description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Main button (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondDescription',
      type: 'localePortableText',
      title: 'Second description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Descriptions with Button section'
      }
    }
  }
}
