import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'hero',
  title: 'Hero',
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
          { title: "Black", value: "#28373C" },
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
      name: 'sideImage',
      type: 'image',
      title: 'Optional Side Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bottomImage',
      type: 'image',
      title: 'Optional Bottom Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Optional button',
    },
    {
      name: 'isSubscriptionSrcLink',
      type: 'boolean',
      title: 'Is the button external link a Subscription SRC?',
      description: 'Enable this option if you inserted a subscription SRC link in the button external link',
      initialValue: false,
    },
    {
      name: 'isButtonReverse',
      type: 'boolean',
      title: 'Reverse button Style?',
      description: 'Enable this option to invert the button layout',
      initialValue: false,
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
        subtitle: 'Hero section',
        media,
      };
    },
  },
};
