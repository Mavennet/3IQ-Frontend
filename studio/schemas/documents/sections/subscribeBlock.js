import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'subscribeBlock',
  title: 'Subscribe Block',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'firstSubscribeDescription',
      type: 'localePortableText',
      title: '1st Subscribe Description (*)',
      description: "Text describing the subscription details",
    },
    {
      name: 'firstSubscribeButtonText',
      type: 'localeString',
      title: '1st Subscribe Button text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'firstSubscribeSrc',
      type: 'url',
      title: '1st Subscribe SRC Link',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'secondSubscribeDescription',
      type: 'localePortableText',
      title: '2nd Subscribe Description',
      description: "Text describing the subscription details",
    },
    {
      name: 'secondSubscribeButtonText',
      type: 'localeString',
      title: '2nd Subscribe Button text',
    },
    {
      name: 'secondSubscribeSrc',
      type: 'url',
      title: '2nd Subscribe SRC Link',
    },
    {
      name: 'thirdSubscribeDescription',
      type: 'localePortableText',
      title: '3rd Subscribe Description',
      description: "Text describing the subscription details",
    },
    {
      name: 'thirdSubscribeButtonText',
      type: 'localeString',
      title: '3rd Subscribe Button text',
    },
    {
      name: 'thirdSubscribeSrc',
      type: 'url',
      title: '3rd Subscribe SRC Link',
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Subscribe Block section'
      }
    }
  }
}
