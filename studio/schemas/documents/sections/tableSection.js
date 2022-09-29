import supportedLanguages from '../../supportedLanguages'
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'tableSection',
  title: 'Table Section',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'isEnableName',
      type: 'boolean',
      title: 'Is the table name visible?',
      description: 'Enable this if you want to display the table name above the table content',
      initialValue: true,
    },
    {
      name: 'embed',
      type: 'localePortableText',
      title: 'HTML Table',
      description: 'Create an optional hardcoded HTML table through the EmbedHTML tag'
    },
    {
      name: 'endpoint',
      type: 'url',
      title: 'API Endpoint',
      description: "Insert an optional URL for the API endpoint that will retrieve the data to populate the table automatically",
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
