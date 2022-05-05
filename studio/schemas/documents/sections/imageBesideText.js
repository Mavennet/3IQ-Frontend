import supportedLanguages from '../../objects/supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'imageBesideText',
  title: 'Image beside text',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading'
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description'
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'button',
      type: 'cta',
      title: 'Main Button'
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'backgroundImage'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero with image section',
        media
      }
    }
  }
}
