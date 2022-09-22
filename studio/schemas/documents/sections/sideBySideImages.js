import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'sideBySideImages',
  title: 'Side by side Images',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'heading',
      type: 'localePortableText',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      description: "Use this field to input the background color in the same pattern as '#FFFFFF'.",
    },
    {
      name: 'imagesContainers',
      type: 'array',
      title: 'Image Containers (*)',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least one item.'),
      ],
      of: [
        {
          title: 'Image Container',
          type: 'imagesContainer',
        },
      ],
    }
  ],
  preview: {
    select: {
      title: `name`,
      media: 'imagesContainers.0.images.0',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Side by Side Images section',
        media,
      };
    },
  },
};
