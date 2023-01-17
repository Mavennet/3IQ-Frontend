import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'quoteFounder',
  title: 'Quote Founder',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Member name',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'quotesText',
      type: 'localePortableText',
      title: 'Text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'localeJobTitle',
      type: 'localeString',
      title: 'Job title'
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Optional button',
      description: 'Optional button that will be displayed above the content'
    },
    {
      name: 'profilePhoto',
      type: 'image',
      title: 'Profile photo image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profilePhoto',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Quote Founder section',
        media,
      };
    },
  },
};
