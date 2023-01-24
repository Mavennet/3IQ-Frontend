import { ComponentIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'automatedArticles',
  title: 'Automated Articles',
  icon: ComponentIcon,
  fields: [
    {
        name: 'name',
        type: 'localeString',
        title: 'Name (*)',
        validation: Rule => Rule.error('Information required.').required(),
    },
    {
      title: "Align title to",
      name: "align",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio"
      }
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category (*)',
      description: "Select a category that will be used to automatically filter the 3 lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if each of the 3 latest Posts for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Read more Button',
      description: 'Optional button to show the route/link to more Posts'
    },
    {
      name: 'buttonInHeader',
      type: 'boolean',
      title: 'Button fixed in Header, inline with Title?',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: `name${baseLanguage.id}`,
      selectedPostCategoryName: `selectedPostCategory.name.${baseLanguage.id}`,
    },
    prepare({ title = '', selectedPostCategoryName = '' }) {
      return {
        title: title + (selectedPostCategoryName ? ' (' + selectedPostCategoryName + ')' : ''),
        subtitle: 'Automated Articles section'
      }
    }
  }
}
