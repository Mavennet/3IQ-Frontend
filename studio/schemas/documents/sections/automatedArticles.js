import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'automatedArticles',
  title: 'Automated Articles',
  icon: SplitHorizontalIcon,
  fields: [
    {
        name: 'name',
        type: 'string',
        title: 'Name (*)',
        validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category (*)',
      description: "Select a category that will be used to filter the lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if the latest Post for the selected category has a News Card that it is associated with**",
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
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Automated Articles section'
      }
    }
  }
}
