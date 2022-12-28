import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'ourFunds',
  title: 'Our Funds',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'fundCards',
      title: 'Fund Cards (*)',
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
          to: [{ type: 'fundCard' }],
          title: 'Fund Card',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Our Funds Section',
        media,
      };
    },
  },
};
