import { ComponentIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'lineChart',
  title: 'Line Chart',
  icon: ComponentIcon,
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
      name: 'chartHeight',
      type: 'number',
      title: 'Chart Height (px)',
      description: "Size to render chart. Default: 120",
    },
    {
      name: 'endpoint',
      type: 'url',
      title: 'API Endpoint (*)',
      description: "Insert the URL for the API endpoint that will retrieve the data to populate the chart automatically",
      validation: Rule =>
        Rule.error('Information required.').required()
            .uri({
              allowRelative: false,
              scheme: ['https', 'http'],
            }),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      endpoint: 'endpoint',

    },
    prepare({ heading, endpoint }) {
      return {
        title: heading,
        subtitle: 'Line Chart section - ' + endpoint,
      };
    },
  },
};
