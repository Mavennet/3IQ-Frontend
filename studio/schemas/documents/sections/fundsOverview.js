import { ComponentIcon, } from '@sanity/icons'

export default {
  type: 'document',
  name: 'fundsOverview',
  title: 'Text Block',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'embed',
      type: 'localePortableText',
      title: 'HTML Table',
      description: 'Create an optional hardcoded HTML table through the EmbedHTML tag',
    },
    {
      name: 'endpoint',
      type: 'url',
      title: 'API Endpoint',
      description: "Insert the URL for the API endpoint that will retrieve the data to populate the table automatically",
      validation: Rule =>
        Rule.uri({
              allowRelative: false,
              scheme: ['https', 'http'],
            }),
    },
    {
      name: 'fundSidebarItem',
      title: 'Fund sidebar items (*)',
      description: 'Select the fund items that will be displayed in order',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate items'),
        Rule.min(1).error('Please, select at least 1 item.'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'fundSidebarItem' }],
          title: 'Fund sidebar items',
        },
      ],
    },
    {
      name: 'footer',
      type: 'localePortableText',
      title: 'Footer',
      description: 'Last text under key facts',
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Button',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Funds Overview section',
        media,
      };
    },
  },
};
