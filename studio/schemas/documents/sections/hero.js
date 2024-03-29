import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'hero',
  title: 'Hero',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeSimplePortableText',
      title: 'Description',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Optional button',
    },
    {
      name: 'isSubscriptionSrcLink',
      type: 'boolean',
      title: 'Is the button external link a Subscription SRC?',
      description: 'Enable this option if you inserted a subscription SRC link in the button external link',
      initialValue: false,
    },
    {
      name: 'isButtonReverse',
      type: 'boolean',
      title: 'Reverse button Style?',
      description: 'Enable this option to invert the button layout',
      initialValue: false,
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
        subtitle: 'Hero section',
        media,
      };
    },
  },
};
