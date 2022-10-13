import { format, parseISO } from 'date-fns';
import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: 'name',
      title: 'Name (*)',
      type: 'string',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'heading',
      title: 'Heading (*)',
      type: 'string',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at (*)',
      type: 'datetime',
      description: 'Used in order to filter the latest posts when displaying new cards automatically by category',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'author',
      title: 'Author (*)',
      type: 'reference',
      to: [
        {
          type: 'person',
        },
      ],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
    {
      name: 'body',
      title: 'Body (*)',
      type: 'portableText',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      description: 'Select one or more categories that this post belongs to',
      validation: Rule => [
        Rule.unique().error('You have duplicate categories'),
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least 1 category'),
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Published At',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'name',
      publishedAt: 'publishedAt',
      media: 'mainImage',
      author: 'author.name',
    },
    prepare({title = 'No title', publishedAt, media, author}) {
      const subtitle = "Published at " +format(parseISO(publishedAt), 'yyyy/MM/dd') + " by " + author
      return {
        title,
        media,
        subtitle: subtitle,
      }
    }
  }
}
