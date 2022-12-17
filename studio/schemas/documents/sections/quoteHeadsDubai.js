import { ComponentIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'quoteHeadsDubai',
  type: 'document',
  title: 'Live Feed Cards For Dubai BTC Fund',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title
      };
    },
  },
}
