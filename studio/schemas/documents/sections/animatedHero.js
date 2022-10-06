import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'animatedHero',
  title: 'Animated Hero',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
        name: 'animatedPhrases',
        title: 'Animated Phrases',
        description: 'Select the phrases items that will be displayed in the animation',
        validation: Rule => [
          Rule.unique().error('You have duplicate timeline items'),
        ],
        type: 'array',
        of: [
          {
            type: 'localeString',
            title: 'Phrase',
          },
        ],
      },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Animated Hero section',
        media,
      };
    },
  },
};
