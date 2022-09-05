import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'textSection',
  title: 'Text',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'text',
      type: 'localePortableText',
      title: 'Text',
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero Section',
        media,
      };
    },
  },
};