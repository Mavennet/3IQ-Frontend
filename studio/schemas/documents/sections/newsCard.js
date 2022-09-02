import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'newsCard',
  title: 'News Card',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'buttonText',
      type: 'localeString',
      title: 'Button text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'post',
      type: 'reference',
      title: 'Post (*)',
      description: 'Select the post that this card should point to',
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'post',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `post.name`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'News Card section',
      }
    }
  }
}
