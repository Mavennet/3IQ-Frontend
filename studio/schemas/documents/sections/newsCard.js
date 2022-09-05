import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'newsCard',
  title: 'News Card',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'buttonText',
      type: 'localeString',
      title: 'Button text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'post',
      type: 'reference',
      title: 'Post (*)',
      description: 'Select the post that this card should refer to',
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'post',
        },
      ],
    },
    {
      name: 'route',
      type: 'reference',
      title: 'Route (*)',
      description: "Select the route that points to this post's Page",
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'route',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `post.name`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'News Card section',
      }
    }
  }
}
