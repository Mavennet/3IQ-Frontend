import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'heroFirstVariation',
  title: 'Hero First Variation',
  icon: SplitHorizontalIcon,
  fields: [
    {
        name: 'name',
        type: 'string',
        title: 'Name (*)',
        validation: Rule => Rule.error('Information required.').required(),
      },
    {
      name: 'heading',
      type: 'localePortableText',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
        name: 'firstButton',
        type: 'localeCta',
        title: 'First button',
      },
      {
        name: 'secondButton',
        type: 'localeCta',
        title: 'Second button',
      },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (*)',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero First Variation section',
        media,
      };
    },
  },
};
