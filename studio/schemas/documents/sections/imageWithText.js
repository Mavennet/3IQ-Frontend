import supportedLanguages from '../../objects/supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'imageWithText',
  title: 'Image with text',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'label',
      type: 'localeString',
      title: 'Label',
    },
    {
      name: 'text',
      type: 'simplePortableText',
      title: 'Text',
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Call to action',
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      subtitle: 'label',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Image section',
        media,
      };
    },
  },
};
