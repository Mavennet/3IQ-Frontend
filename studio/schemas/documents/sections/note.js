import supportedLanguages from '../../supportedLanguages';
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'note',
  title: 'Compact Notes',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftTextBlock',
      type: 'localePortableText',
      title: 'Left Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'rightTextBlock',
      type: 'localePortableText',
      title: 'Right Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Compact Notes section',
      };
    },
  },
};
