import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'tabsContent',
  title: 'Timeline',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'tabItems',
      title: 'Tab items',
      description: 'Select the tab items that will be displayed in order',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate timeline items'),
        Rule.min(1).error('Please, select at least 1 page section.'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tabItem' }],
          title: 'Tab item',
        },
      ],
    },

  ],
  preview: {
    select: {
      title: `name`,
      tabItemsLength: `tabItems.length`,
    },
    prepare({ title, tabItemsLength }) {
      const tabItemsLengthText = tabItemsLength > 0 ? ' - ' + tabItemsLength + ' tab(s)' : ''
      return {
        title,
        subtitle: 'Tabs Content section' + tabItemsLengthText,
      };
    },
  },
};
