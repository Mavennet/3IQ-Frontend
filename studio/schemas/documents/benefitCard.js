import { format, parseISO } from 'date-fns';
import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'benefitCard',
  title: 'Benefit',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'heading',
      title: 'Heading (*)',
      type: 'localeString',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'body',
      title: 'Body (*)',
      type: 'localePortableText',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'mainImage',
    },
    prepare({ title = 'No title', media }) {
      return {
        title,
        media,
      }
    }
  }
}
