import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'tabsContent',
  title: 'Timeline',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
    },
    {
      name: 'isAccordionLayout',
      type: 'boolean',
      title: 'Tabs with accordion layout?',
      description: 'Enable this option to display the tabs as an accordion for mobile resolution',
      initialValue: false,
    }, 
    {
      name: 'tabItems',
      title: 'Tab items (*)',
      description: 'Select the tab items that will be displayed in order',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate tab items'),
        Rule.min(1).error('Please, select at least 1 item.'),
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
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      tabItemsLength: `tabItems.length`,
      media: 'backgroundImage',
    },
    prepare({ title, tabItemsLength, media }) {
      const tabItemsLengthText = tabItemsLength > 0 ? ' - ' + tabItemsLength + ' tab(s)' : ''
      return {
        title,
        subtitle: 'Tabs Content section' + tabItemsLengthText,
        media,
      };
    },
  },
};
