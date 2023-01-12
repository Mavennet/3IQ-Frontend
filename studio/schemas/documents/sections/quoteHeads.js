import { ComponentIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'quoteHeads',
  type: 'document',
  title: 'Live Feed Cards',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'orangeBoxEndpoint',
      type: 'url',
      title: 'Endpoint (Orange Box)',
    },
    {
      name: 'greenBoxEndpoint',
      type: 'url',
      title: 'Endpoint (Green Box)',
    },
    {
      name: 'dateText',
      type: 'localeString',
      title: 'Date translate text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'volumeText',
      type: 'localeString',
      title: 'Date volume text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
        subtitle: 'Live Feed Cards section',
      };
    },
  },
}
