import { SplitHorizontalIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'keyBenefits',
  type: 'document',
  title: 'Key Benefits',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'benefits',
      title: 'Benefits (*)',
      description: 'Choose the benefits that will be displayed',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(4).max(4).error('Please, select 4 benefits.'),
      ],
      of: [{ type: 'reference', to: { type: 'benefitCard' } }],
    },
    {
      name: 'fundsLayout',
      type: 'boolean',
      title: 'Funds Layout (*)',
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
    prepare({ title = 'No title' }) {
      return {
        title,
        subtitle: 'Key Benefits section'
      };
    },
  },
}
