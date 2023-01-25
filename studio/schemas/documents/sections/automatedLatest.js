import { ComponentIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'automatedLatest',
  title: 'Automated Latest',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftTitle',
      type: 'localeString',
      title: 'Left Title',
      description: 'Title to display in first left posts list.'
    },
    {
      name: 'leftCategory',
      title: 'Left Post Category (*)',
      description: "Select a category that will be used to automatically filter the 3 lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if each of the 3 latest Posts for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'leftButton',
      type: 'localeCta',
      title: 'Left Read more Button',
      description: 'Optional button to show the route/link to more Posts'
    },
    {
      name: 'rightTitle',
      type: 'localeString',
      title: 'Right Title',
      description: 'Title to display in first right posts list.'
    },
    {
      name: 'rightCategory',
      title: 'Right Post Category (*)',
      description: "Select a category that will be used to automatically filter the 3 lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if each of the 3 latest Posts for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'rightButton',
      type: 'localeCta',
      title: 'Right Read more Button',
      description: 'Optional button to show the route/link to more Posts'
    },
    {
      name: 'bottomTitle',
      type: 'localeString',
      title: 'Bottom Title',
      description: 'Title to display in the bottom posts list.'
    },
    {
      name: 'bottomCategory',
      title: 'Bottom Post Category (*)',
      description: "Select a category that will be used to automatically filter the 3 lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if each of the 3 latest Posts for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'bottomButton',
      type: 'localeCta',
      title: 'Bottom Read more Button',
      description: 'Optional button to show the route/link to more Posts'
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Automated Latest section'
      }
    }
  }
}
