import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'note',
  title: 'Note Section',
  icon: SplitHorizontalIcon,
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
        subtitle: 'Note section',
      };
    },
  },
};
