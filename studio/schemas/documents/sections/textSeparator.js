import { SplitHorizontalIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'textSeparator',
  title: 'Text Separator',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      description: "The title will only be visible if you select a background color above.",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      description: "Use this optional field to input the background color in the same pattern as the color '#FFFFFF'. The default color is '#E8E8EAAD'.",
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
        subtitle: 'Text Separator section'
      }
    }
  }
}
