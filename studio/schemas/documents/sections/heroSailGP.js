import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'heroSailGP',
  title: 'Hero SailGP',
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
      type: 'localeSimplePortableText',
      title: 'Description',
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
      name: 'button',
      type: 'localeCta',
      title: 'Main button (*)',
      validation: Rule => Rule.error('Information required.').required(),
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
        subtitle: 'Hero SailGP section',
        media,
      };
    },
  },
};
