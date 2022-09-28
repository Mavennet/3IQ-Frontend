import { MasterDetailIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'keyBenefits',
  type: 'document',
  title: 'Key Benefits',
  icon: MasterDetailIcon,
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
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
      // firstBenefitHeading: `benefit.0.heading`,
      // secondBenefitHeading: `benefit.1.heading`,
      // thirdBenefitHeading: `benefit.2.heading`,
      // fourthBenefitHeading: `benefit.3.heading`,
    },
    prepare({ title = 'No title' }) {
      return {
        title,
      };
    },
  },
}
