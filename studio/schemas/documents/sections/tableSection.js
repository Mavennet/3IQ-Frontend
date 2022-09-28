import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'tableSection',
  title: 'Table Section',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'isEnableName',
      type: 'boolean',
      title: 'Show table name in section?',
      initialValue: true,
    },
    {
      name: 'embed',
      type: 'localePortableText',
      title: 'Html Table (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'endpoint',
      type: 'string',
      title: 'Endpoint',
      description: "URL to get data and render table",
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Table section',
      };
    },
  },
};
