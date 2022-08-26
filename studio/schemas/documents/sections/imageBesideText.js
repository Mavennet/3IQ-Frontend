import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'imageBesideText',
  title: 'Image beside text',
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
      type: 'localeText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (*)',
      validation: Rule => Rule.error('Information required.').required(),
      options: {
        hotspot: true
      }
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Optional image',
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Main Button (*)',
      validation: Rule => Rule.error('Information required.').required(),
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
        subtitle: 'Image Beside Text section',
        media,
      }
    }
  }
}
