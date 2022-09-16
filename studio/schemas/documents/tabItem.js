import supportedLanguages from '../supportedLanguages';
import { MdLinearScale } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'tabItem',
  type: 'document',
  title: 'Tab Item',
  icon: MdLinearScale,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Tab item Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'contentBlock',
      type: 'localePortableText',
      title: 'Content Block',
    },
    {
      name: 'isNewsCardsHorizontalLayout',
      type: 'boolean',
      title: 'News Cards with Horizontal layout?',
      description: 'Enable this option to display the selected News Cards with horizontal layout.',
      initialValue: false,
    },  
    {
      name: 'newsCards',
      type: 'array',
      title: 'News Cards from Posts',
      validation: Rule => [
        Rule.max(3).error('Maximum 3 News Cards from Posts are allowed.'),
        Rule.unique().error('You have duplicate items.'),
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'newsCard' }],
        },
      ],
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Read more posts Button',
      description: 'Optional button to show the route/link to more Posts'
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      newsCardsLength: `newsCards.length`
    },
    prepare({ name, newsCardsLength }) {
      const newsCardsLengthText = newsCardsLength > 0 ? newsCardsLength + ' news card(s) included' : 'No news card included'
      return {
        title: `${name}`,
        subtitle: newsCardsLengthText,
      }
    },
  }
}
