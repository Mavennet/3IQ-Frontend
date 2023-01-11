import supportedLanguages from '../../supportedLanguages'
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'heroDoubleButton',
  title: 'Hero Fund',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'tagName',
      type: 'localeText',
      title: 'Tag Name',
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
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
        subtitle: 'Hero Fund section',
        media
      }
    }
  }
}
