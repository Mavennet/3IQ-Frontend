import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'tabsContent',
  title: 'Tabs Content',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeSimplePortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'firstImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Double Options section',
        media,
      };
    },
  },
};
