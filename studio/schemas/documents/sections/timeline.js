import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'timeline',
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
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (*)',
      validation: Rule => Rule.error('Information required.').required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'leftFirstTextBlock',
      type: 'localePortableText',
      title: 'Left First Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftSecondTextBlock',
      type: 'localePortableText',
      title: 'Left Second Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'span',
      title: 'Span',
      type: 'localeString',
    },
    {
      name: 'items',
      title: 'Timeline items',
      description: 'Select the timeline items that will be displayed in order',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate timeline items'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'timelineItem' }],
          title: 'Timeline item',
        },
      ],
    },

  ],
  preview: {
    select: {
      title: `name`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Timeline section',
        media,
      };
    },
  },
};
