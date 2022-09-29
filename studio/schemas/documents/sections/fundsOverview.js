import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'fundsOverview',
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
