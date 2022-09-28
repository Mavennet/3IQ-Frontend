import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'lineChart',
  title: 'Line Chart',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
      description: "Description about chart",
    },
    {
      name: 'mobileSize',
      type: 'number',
      title: 'Mobile Size',
      description: "(1 - 12) Mobile Grid. Default: 12",
    },
    {
      name: 'desktopSize',
      type: 'number',
      title: 'Desktop Size',
      description: "(1 - 12) Desktop Grid. Default: 12",
    },
    {
      name: 'lineColor',
      type: 'string',
      title: 'Line Color',
      description: "Default: #0082E5",
    },
    {
      name: 'chartHeight',
      type: 'number',
      title: 'Chart Height (px)',
      description: "Size to render chart. Default: 120",
    },
    {
      name: 'endpoint',
      type: 'string',
      title: 'Endpoint (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ heading }) {
      return {
        heading,
      };
    },
  },
};
