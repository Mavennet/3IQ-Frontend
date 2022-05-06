import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'imageBesideText',
  title: 'Image beside text',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      validation: Rule => Rule.error('Information required.').required(),
      options: {
        hotspot: true
      }
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Main Button',
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero with image section',
        media,
      }
    }
  }
}
