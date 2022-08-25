import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'sideBySideImages',
  title: 'Side by side Images',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images (*)',
      validation: Rule => Rule.error('Information required.').required(),
      of: [
        {
          title: 'Image',
          type: 'figure',
        },
      ],
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'images.0',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Side by Side Images section',
        media,
      };
    },
  },
};
