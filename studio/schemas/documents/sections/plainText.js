import { SplitHorizontalIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'plainText',
  title: 'Plain Text',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      description: "The name will only be used for preview.",
    },
    {
      name: 'portableText',
      type: 'localePortableText',
      title: 'Display Text (*)',
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
        subtitle: 'Plain Text section'
      }
    }
  }
}
