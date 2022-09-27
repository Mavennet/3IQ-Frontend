import supportedLanguages from '../../supportedLanguages'
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'heroDoubleButton',
  title: 'Hero with 2 Buttons',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Optional image'
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Main Button (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'secondButton',
      type: 'localeCta',
      title: 'Second Button (*)',
      validation: Rule => Rule.error('Information required.').required()
    }
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: 'backgroundImage'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero with 2 Buttons section',
        media
      }
    }
  }
}
