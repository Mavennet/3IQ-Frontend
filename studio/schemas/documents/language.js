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
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'languageTag',
      type: 'string',
      title: 'Language Tag (*)',
      description: 'Combination of the language ISO 639-1 code (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and the country code TDL (https://en.wikipedia.org/wiki/Country_code_top-level_domain) for specific language & country combinations, such as "en_CA", "en_US", "ar_AE" or "fr_CA".',
      validation: Rule => Rule.error('Information required.').required(),
    }
  ],
  preview: {
    select: {
      name: 'name',
      languageTag: 'languageTag'
    },
    prepare({ name, languageTag }) {
      return {
        title: `${name}`,
        subtitle: `${languageTag}`,
      }
    },
  },

}
