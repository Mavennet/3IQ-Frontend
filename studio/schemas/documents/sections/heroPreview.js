import { BlockquoteIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages'
const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'heroPreview',
  title: 'Hero Preview',
  icon: BlockquoteIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'post',
      type: 'reference',
      title: 'Post (*)',
      description: "Select the post that this card should refer to. It is a good practice to keep only 1 News Card per Post, since it will avoid duplicates being displayed when enabling the News Cards Paginated Layout on a Tab Item",
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'post',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (*)',
      validation: Rule => Rule.error('Information required.').required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'greenLayout',
      type: 'boolean',
      title: 'Is green layout?',
      description: 'Enable this option to change color to green',
      initialValue: false,
    },
    {
      name: 'shortDescription',
      type: 'localePortableText',
      title: 'Short description',
      description: "Optional overview about the selected post for the normal-sized News Card",
    },
    {
      name: 'buttonText',
      type: 'localeString',
      title: 'Button text (*)',
      validation: Rule => Rule.error('Information required.').required(),
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
      title: `heading.${baseLanguage.id}`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
        subtitle: 'Hero Preview section'
      }
    }
  }
}
