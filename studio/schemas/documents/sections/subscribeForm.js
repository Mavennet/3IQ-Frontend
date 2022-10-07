import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'subscribeForm',
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
      name: 'items',
      title: 'Items (*)',
      description: 'Choose the items that will be displayed',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
      ],
      of: [{ type: 'reference', to: { type: 'item' } }],
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Subscribe Form section'
      }
    }
  }
}
