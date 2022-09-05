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
      name: 'label',
      type: 'localeString',
      title: 'Label',
    },
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
    },
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
