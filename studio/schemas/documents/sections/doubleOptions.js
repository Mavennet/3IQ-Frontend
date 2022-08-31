import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'doubleOptions',
  title: 'Double Options',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeString',
      title: 'Description',
    },
    {
      name: 'firstImage',
      type: 'figure',
      title: 'First image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondImage',
      type: 'figure',
      title: 'Second image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'firstButton',
      type: 'localeCta',
      title: 'First button (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondButton',
      type: 'localeCta',
      title: 'Second button (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'firstImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Double Options section',
        media,
      };
    },
  },
};
