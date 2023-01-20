import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'imageBesideText',
  title: 'Image beside Text',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'isInvertedLayout',
      type: 'boolean',
      title: 'Invert layout?',
      description: 'Enable this option to invert the content and show the image on the right side',
      initialValue: false,
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'videoSrc',
      type: 'string',
      title: 'YouTube video ID',
      description: 'Optional display of an YouTube video through its ID'
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'Optional display of an video through its url'
    },
  ],
  preview: {
    select: {
      title: `heading`,
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Image Beside Text section',
        media,
      }
    }
  }
}
