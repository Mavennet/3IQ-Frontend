import supportedLanguages from '../../supportedLanguages'
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'tableSection',
  title: 'Table Section',
  icon: ComponentIcon,
  fieldsets: [
    {
      title: 'Table Source',
      name: 'tableComposition',
      description: 'Select if you will use an API Endpoint as the data source or if the table will be HTML hardcoded',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
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
      description: 'Optional title that will be displayed above the table',
      title: 'Heading',
    },
    {
      name: 'headerTransparentLayout',
      type: 'boolean',
      title: 'Use layout with transparent header?',
      description: 'Header will be a white color',
      initialValue: false,
    },
    {
      name: 'headerFundPerformance',
      type: 'boolean',
      title: 'Enable a specific header to Fund Performance Section?',
      description: 'First cell blank, second cell Total Returns and third cell Annualized Returns',
      initialValue: false,
    },
    {
      name: 'colorfulLayout',
      type: 'boolean',
      title: 'Use a colorful layout?',
      description: 'First cells with orange font and last cells with background blue',
      initialValue: false,
    },
    {
      title: "Color",
      name: "color",
      type: "string",
      options: {
        list: [
          { title: "Light Blue", value: "lightBlue" },
          { title: "Dark Blue", value: "darkBlue" },
          { title: "Orange", value: "orange" },
        ],
        layout: "radio"
      }
    },
    {
      name: 'downloadButton',
      type: 'boolean',
      title: 'Enable download button?',
      description: 'Show download button to save CSV data',
      initialValue: false,
    },
    {
      name: 'headers',
      title: 'Table Heading Cells',
      description: 'Create each table heading cell to serve as the header of your API Endpoint table. Mandatory if you decide to use an API Endpoint as the data source',
      type: 'array',
      of: [{ type: 'localeString' }],
      fieldset: 'tableComposition',
    },
    {
      name: 'endpoint',
      type: 'url',
      title: 'API Endpoint',
      description: "Insert an optional URL for the API endpoint that will retrieve the data to populate the table automatically",
      fieldset: 'tableComposition',
      validation: Rule =>
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'http'],
        }),
    },
    {
      name: 'embed',
      type: 'localePortableText',
      title: 'Description',
      description: 'This field you can add any text to display above either the Endpoint API table or the HTML one',
      fieldset: 'tableComposition',
    },
  ],
  preview: {
    select: {
      title: 'name',
      endpoint: 'endpoint',
      embed: `embed.${baseLanguage.id}`,
    },
    prepare({ title, endpoint, embed }) {
      const subtitleText = ' - ' + (endpoint ? endpoint : (embed ? 'Hardcoded table' : 'No source defined for this table'))
      return {
        title,
        subtitle: 'Custom Table section' + subtitleText,
      };
    },
  },
};
