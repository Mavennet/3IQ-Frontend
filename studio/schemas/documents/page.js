import { MasterDetailIcon } from '@sanity/icons'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MasterDetailIcon,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'hero'},
            {type: 'heroWithImage'},
            {type: 'imageWithText'},
            {type: 'imageBesideText'},
            {type: 'mailchimp'}
          ]
        }
      ]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata',
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
    {
      name: 'countries',
      title: 'Countries',
      description: 'Choose one or more countries to display this content into (empty for all countries)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'country'}}]
    },
  ],

  preview: {
    select: {
    },
  },
  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage',
      country0: 'countries.0.name',
    },
    prepare({ title, media, country0 }) {
      const subtitle = country0 ? country0 : 'All Countries'
      return {
        title,
        media,
        subtitle: `${subtitle}`
      };
    },
  },
}
