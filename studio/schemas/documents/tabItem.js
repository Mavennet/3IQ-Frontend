import supportedLanguages from '../supportedLanguages';
import { MdLinearScale } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'tabItem',
  type: 'document',
  title: 'Tab Item',
  icon: MdLinearScale,
  validation: Rule =>
    Rule.custom(
      (fields = {}) =>
        (fields.isPaginatedNewsletter && !fields.selectedPostCategory) ? "You need to select a Post Category in order to use the Paginated News Cards Layout." : true
    ),
  fieldsets: [
    {
      title: 'Paginated News Cards Layout',
      name: 'paginatedLayout',
      description: 'Enable this option to display all the News Cards with a pagination layout filtered by the category of the post referenced at the card',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
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
      name: 'isPaginatedNewsletter',
      type: 'boolean',
      title: 'Is this tab item only for Paginated News Cards layout?',
      description: 'Enabling this layout will override the other layouts.',
      initialValue: false,
      fieldset: 'paginatedLayout',
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category',
      description: 'Select a category that will be used to filter News Cards based on the category of the post referenced at the card only for the Paginated News Cards layout',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'paginatedLayout',
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
      newsCardsLength: `newsCards.length`,
      isPaginatedNewsletter: `isPaginatedNewsletter`,
    },
    prepare({ name, newsCardsLength, isPaginatedNewsletter }) {
      const subtitleText = isPaginatedNewsletter ? 'Paginated News' : (newsCardsLength > 0 ? newsCardsLength + ' news card(s) included' : 'No news card included')
      return {
        title: `${name}`,
        subtitle: subtitleText,
      }
    },
  }
}
