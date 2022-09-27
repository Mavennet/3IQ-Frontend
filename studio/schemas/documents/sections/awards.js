import supportedLanguages from '../../supportedLanguages'
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'awards',
  title: 'Awards',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'images',
      type: 'array',  
      title: 'Awards Carousel',
      description: 'Choose the images that will be displayed in the scrollable carousel',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select an image.')
      ],
      of: [
        {
          title: 'Image',
          type: 'figure'
        }
      ]
    },
    {
      name: 'video',
      type: 'figure',
      title: 'Award Display',
      description: 'Choose between an animated image (GIF) or a static image',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required()
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'images.0'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Awards section',
        media
      }
    }
  }
}
