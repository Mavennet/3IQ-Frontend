import supportedLanguages from '../../objects/supportedLanguages';

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
    },
    {
        name: 'seccondImage',
        type: 'figure',
        title: 'Seccond image',
      },
    {
      name: 'firstButton',
      type: 'localeCta',
      title: 'First button'
    },
    {
        name: 'seccondButton',
        type: 'localeCta',
        title: 'Seccond button'
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
