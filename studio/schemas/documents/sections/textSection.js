import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'textSection',
  title: 'Text Block',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'text',
      type: 'localePortableText',
      title: 'Text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Text Block section',
      };
    },
  },
};
