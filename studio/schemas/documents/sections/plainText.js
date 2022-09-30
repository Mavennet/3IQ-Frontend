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
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      description: "The title will only be used for preview.",
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
      title: `title.${baseLanguage.id}`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Plain Text section'
      }
    }
  }
}
