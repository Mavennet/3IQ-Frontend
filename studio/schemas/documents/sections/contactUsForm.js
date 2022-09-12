import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'contactUsForm',
  title: 'Contact Us Form',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'contactUsFormSrc',
      type: 'url',
      title: 'Form Link (*)',
      description: "This is the link that will load the form fields in the website",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Contact Us Form section'
      }
    }
  }
}
