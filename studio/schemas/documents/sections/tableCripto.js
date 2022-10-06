import supportedLanguages from '../../supportedLanguages'
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'tableCripto',
  title: 'Table Cripto',
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
    },
    {
      name: 'headers',
      title: 'Table Heading Cells',
      description: 'Create each table heading cell to serve as the header of your API Endpoint table. Mandatory if you decide to use an API Endpoint as the data source',
      type: 'array',
      of: [{ type: 'localeString' }],
    },
    {
      name: 'endpoint',
      type: 'url',
      title: 'API Endpoint',
      description: "Insert an optional URL for the API endpoint that will retrieve the data to populate the table automatically",
      validation: Rule =>
        Rule.error('Information required.').required()
            .uri({
              allowRelative: false,
              scheme: ['https', 'http'],
            }),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
      description: "Description about table",
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
