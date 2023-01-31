import supportedLanguages from '../supportedLanguages';
import { BookIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  icon: BookIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeString',
      title: 'Description (*)',
    },
    {
      name: 'searchCategory',
      type: 'boolean',
      title: 'Search Category (*)',
      description: 'Select used to mark this category as one who will appear on the search screen.',
      initialValue: false,
      hidden: ({currentUser}) => {
        return !(currentUser.roles.find(({name}) => name === 'editor'))
      }
    },
    {
      name: 'searchId',
      type: 'string',
      title: 'Search Id',
      hidden: ({currentUser}) => {
        return !(currentUser.roles.find(({name}) => name === 'editor'))
      }
    },
    {
      name: 'optionalTitle',
      type: 'localeString',
      title: 'Optional Title (*)',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      validation: Rule => Rule.min(0).integer().positive(),
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
    },
    prepare({ name }) {
      return {
        title: `${name}`,
      }
    },
  },

}
