import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'heroBigImage',
  title: 'Hero Big Image',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeSimplePortableText',
      title: 'Description',
    },
    {
      name: 'fontColor',
      type: 'string',
      title: 'Font color',
      description: 'Default: #FFF (White)',
      options: {
        list: [
          { title: "Blue", value: "#0082E5" },
          { title: "Green", value: "#008C86" },
          { title: "Orange", value: "#F59B1E" },
          { title: "White", value: "#FFFFFF" }
        ],
        layout: "radio"
      }
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background color',
      description: 'Default: #091b3f (Blue)',
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
        subtitle: 'Hero Big Image section',
        media,
      };
    },
  },
};
