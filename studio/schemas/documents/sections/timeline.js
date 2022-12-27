import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'timeline',
  title: 'Timeline',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftFirstTextBlock',
      type: 'localePortableText',
      title: 'First Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftSecondTextBlock',
      type: 'localePortableText',
      title: 'Second Text Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'firstDateContent',
      type: 'localeBioPortableText',
      title: '2012 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondDateContent',
      type: 'localeBioPortableText',
      title: '2017 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'thirdDateContent',
      type: 'localeBioPortableText',
      title: '2018 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'fourthDateContent',
      type: 'localeBioPortableText',
      title: '2020 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'fifthDateContent',
      type: 'localeBioPortableText',
      title: '2021 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'sixthDateContent',
      type: 'localeBioPortableText',
      title: '2022 text description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'span',
      title: 'Short text',
      description: 'Short text above the second text block on the left',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: `name`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Timeline section',
        media,
      };
    },
  },
};
