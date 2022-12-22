import supportedLanguages from '../../supportedLanguages'
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
    type: 'document',
    name: 'componentsTests',
    title: 'Components Tests',
    icon: SplitHorizontalIcon,
    fields: [
      {
        name: 'heading',
        type: 'localeString',
        title: 'Heading',
        validation: Rule => Rule.error('Information required.').required(),
      }
    ],
    preview: {
      select: {
        title: `heading.${baseLanguage.id}`,
      },
      prepare({title, media}) {
        return {
          title,
          subtitle: 'Components Tests Section',
          media,
        }
      },
    },
  }
  