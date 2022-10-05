import { SplitHorizontalIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'automatedNewsCard',
  title: 'Automated News Card',
  icon: SplitHorizontalIcon,
  fields: [
    {
        name: 'name',
        type: 'localeString',
        title: 'Name'
    },
    {
      name: 'isInvertedLayout',
      type: 'boolean',
      title: 'Invert layout?',
      description: 'Enable this option to invert the content and show the image on the right side',
      initialValue: false,
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category',
      description: 'Select a category that will be used to filter News Cards based on the category of the post referenced at the card only for the Paginated News Cards layout',
      type: 'reference',
      to: [{ type: 'category' }],
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      isInverted: `isInvertedLayout`,
    },
    prepare({ title, isInverted }) {
      const isInvertedText = isInverted ? ' - Inverted' : ''
      return {
        title,
        subtitle: 'News Card section' + isInvertedText
      }
    }
  }
}
