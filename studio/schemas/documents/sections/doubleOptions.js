import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'doubleOptions',
  title: 'Double Options',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeSimplePortableText',
      title: 'Description',
    },
    {
      name: 'firstImage',
      type: 'figure',
      title: 'First image',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondImage',
      type: 'figure',
      title: 'Second image',
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
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'firstImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Two options section',
        media,
      };
    },
  },
};
