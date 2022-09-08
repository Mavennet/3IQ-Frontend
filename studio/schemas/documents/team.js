
import supportedLanguages from '../supportedLanguages';
import { UsersIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'team',
  type: 'document',
  title: 'Teams',
  icon: UsersIcon,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'members',
      type: 'array',
      title: 'Team members (*)',
      description: "Select the team members that are part of this team",
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least 1 team member.'),
      ],
      of: [
        {
          type: 'reference',
          to: [
            {type: 'person'}
          ]
        }
      ]
    },
    {
      name: 'countries',
      title: 'Countries (*)',
      description: 'Choose the country that this content will be displayed into',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select a country.'),
      ],
      of: [{type: 'reference', to: {type: 'country'}}],
    },
  ], 
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      firstCountryName: `countries.0.name`,
      secondCountryName: `countries.1.name`,
      thirdCountryName: `countries.2.name`,
      fourthCountryName: `countries.3.name`,
      fifthCountryName: `countries.4.name`,  // By passing the countries names, it will be able to access them within prepare() without only receiving the reference _ref
    },
    prepare({name = 'No name', firstCountryName = '', secondCountryName, thirdCountryName, fourthCountryName, fifthCountryName }) {
      let countryNames = firstCountryName;
      countryNames = secondCountryName ? countryNames.concat(', ' + secondCountryName) : countryNames;
      countryNames = thirdCountryName ? countryNames.concat(', ' + thirdCountryName) : countryNames;
      countryNames = fourthCountryName ? countryNames.concat(', ' + fourthCountryName) : countryNames;
      countryNames = fifthCountryName ? countryNames.concat(', ' + fifthCountryName) : countryNames;

      return {
        title: name,
        subtitle: countryNames,
      }
    }
  }
}