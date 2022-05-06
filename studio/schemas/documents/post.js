import { format, parseISO } from 'date-fns';
import { MdInsertDriveFile } from "react-icons/md";
import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      icon: MdInsertDriveFile,
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'postPortableText',
    },
    {
      name: 'person',
      title: 'Author',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'relatedPosts',
      title: 'Related posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    },
    {
      name: 'countries',
      title: 'Countries',
      description: 'Choose one or more countries to display this content into (empty for all countries)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'country'}}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({title = 'No title', publishedAt, slug = {}, media}) {
      const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: path,
      }
    }
  }
}
