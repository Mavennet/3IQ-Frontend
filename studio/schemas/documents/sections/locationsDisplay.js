import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'locationsDisplay',
  title: 'Locations Display',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'locations',
      description: 'Select the locations that will be displayed',
      title: 'Locations',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate locations'),
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least 1 page section.'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'location' }],
          title: 'Location',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Locations Display section'
      }
    }
  }
}
