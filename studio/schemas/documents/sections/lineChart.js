import { ComponentIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'lineChart',
  title: 'Line Chart',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
      description: 'Optional title that will be displayed above the chart',
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
      name: 'chartColor',
      type: 'string',
      title: 'Line chart color',
      description: 'Default: Light Blue',
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
      title: 'name',
      endpoint: 'endpoint',

    },
    prepare({ title, endpoint }) {
      return {
        title,
        subtitle: 'Line Chart section - ' + endpoint,
      };
    },
  },
};
