import { MdTranslate } from "react-icons/md";

export default {
  name: 'language',
  type: 'document',
  title: 'Language',
  icon: MdTranslate,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'languageTag',
      type: 'string',
      title: 'Language Tag',
      description: 'IETF language tag with ISO 3166-1 country code for specific language & country combinations, such as "en_US" or "pt_BR". And only IETF language tag for only the general language, such as "fr" or "en".',
      validation: Rule => Rule.error('Information required.').required()
    }
  ]
}
