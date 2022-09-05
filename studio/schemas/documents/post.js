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
      type: 'localeString',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at (*)',
      type: 'datetime',
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
      type: 'localePortableText',
      validation: Rule => Rule.error('Information required.').required(),
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
