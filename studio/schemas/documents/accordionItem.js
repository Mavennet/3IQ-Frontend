
import supportedLanguages from '../supportedLanguages';
import { EqualIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'accordionItem',
  type: 'document',
  title: 'Accordion Item',
  icon: EqualIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
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
    prepare({name = 'No name'}) {
      return {
        title: name,
      }
    }
  }
}
