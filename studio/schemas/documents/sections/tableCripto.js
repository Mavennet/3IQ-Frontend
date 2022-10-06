import supportedLanguages from '../../supportedLanguages'
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'tableCripto',
  title: 'Table Cripto',
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
      title: 'Heading',
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
  ],
  preview: {
    select: {
      title: 'name',
      endpoint: 'endpoint'
    },
    prepare({ title, endpoint }) {
      const subtitleText = ' - ' + endpoint
      return {
        title,
        subtitle: 'Custom Table section' + subtitleText,
      };
    },
  },
};
