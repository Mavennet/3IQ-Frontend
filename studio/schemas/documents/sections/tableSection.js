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
      title: 'Html Table',
      description: 'Create an optional hardcoded HTML table through the EmbedHTML tag'
    },
    {
      name: 'endpoint',
      type: 'string',
      title: 'Endpoint',
      description: "Insert an optional URL for the endpoint that will retrieve the data to populate the table automatically",
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
