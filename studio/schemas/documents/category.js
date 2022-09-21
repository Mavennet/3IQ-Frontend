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
