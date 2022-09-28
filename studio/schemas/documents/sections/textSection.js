import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'textSection',
  title: 'Text Block',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'text',
      type: 'localePortableText',
      title: 'Text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'videoSrc',
      type: 'string',
      title: 'Video Source',
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Main button (*)'
    },
    {
      name: 'isButtonCentralized',
      type: 'boolean',
      title: 'Is the button centralized?',
      description: 'Enable this option to display the button aligned on the center',
      initialValue: true,
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
      name: 'isGrayBackground',
      type: 'boolean',
      description: 'Enable this to add an optional gray background to highlight the text',
      title: 'Add gray background to the text?',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Text Block section',
        media,
      };
    },
  },
};
