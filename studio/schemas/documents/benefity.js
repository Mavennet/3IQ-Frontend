
import supportedLanguages from '../supportedLanguages';
import { HeartIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'benefity',
  type: 'document',
  title: 'Benefity',
  icon: HeartIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'imageIcon',
      type: 'figure',
      title: 'Icon (*)',
      description: 'Recommended to add profile photos with 1:1 (square) proportion',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
    }
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      media: 'imageIcon'
    },
    prepare({name = 'No name', media}) {
      return {
        title: name,
        media,
      }
    }
  }
}
