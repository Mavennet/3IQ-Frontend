import supportedLanguages from '../../supportedLanguages';
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'articles',
  type: 'document',
  title: 'Articles',
  icon: ComponentIcon,
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
      title: 'Section name (*)',
      validation: Rule => Rule.error('Information required.').required(),
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
      name: 'newsCards',
      type: 'array',
      title: 'News Cards from Posts',
      validation: Rule => [
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
      title: 'Read more Button',
      description: 'Optional button to show the route/link to more Posts'
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      newsCardsLength: `newsCards.length`,
    },
    prepare({ name, newsCardsLength }) {
      const subtitleText = (newsCardsLength > 0 ? newsCardsLength + ' news card(s) included' : 'No news card included')
      return {
        title: `${name}`,
        subtitle: subtitleText,
      }
    },
  }
}
