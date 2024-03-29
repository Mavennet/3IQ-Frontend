import { ComponentIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'readyToInvest',
  title: 'Ready To Invest',
  icon: ComponentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'heading',
      type: 'localePortableText',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'ctaButton',
      type: 'localeCta',
      title: 'Call to Action Button'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      description: "Use this field to input the background color in the same pattern as '#FFFFFF'. The default is #E8E8EA",
    },
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Ready To Invest section',
      };
    },
  },
};
