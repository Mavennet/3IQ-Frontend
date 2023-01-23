import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'accordionText',
  title: 'Accordion',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'accordionItem',
      type: 'array',
      title: 'Items (*)',
      description: 'Select the accordion itens that will be displayed',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least 1 benefity.'),
      ],
      of: [
        {
          type: 'reference',
          to: [{type: 'accordionItem'}],
        },
      ],
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      firstCountryName: `accordionItem.0.countries.0.name`,
      secondCountryName: `accordionItem.0.countries.1.name`,
      thirdCountryName: `accordionItem.0.countries.2.name`,
      fourthCountryName: `accordionItem.0.countries.3.name`,
      fifthCountryName: `accordionItem.0.countries.4.name`,  // By passing the countries names, it will be able to access them within prepare() without only receiving the reference _ref
    },
    prepare({ name = '', firstCountryName = '', secondCountryName, thirdCountryName, fourthCountryName, fifthCountryName }) {
      let countryNames = firstCountryName;
      countryNames = secondCountryName ? countryNames.concat(', ' + secondCountryName) : countryNames;
      countryNames = thirdCountryName ? countryNames.concat(', ' + thirdCountryName) : countryNames;
      countryNames = fourthCountryName ? countryNames.concat(', ' + fourthCountryName) : countryNames;
      countryNames = fifthCountryName ? countryNames.concat(', ' + fifthCountryName) : countryNames;

      const title = name
      return {
        title,
        subtitle: 'Accordion section',
      };
    },
  },
};
