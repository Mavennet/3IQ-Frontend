import { MasterDetailIcon } from '@sanity/icons'

export default {
  name: 'section',
  type: 'document',
  title: 'Section',
  icon: MasterDetailIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Section',
      of: [
        { type: 'hero' },
        { type: 'heroWithImage' },
        { type: 'imageSection' },
        { type: 'mailchimp' },
        { type: 'textSection' },
      ],
      validation: Rule => [
        Rule.max(1).error('Only one section allowed.'),
        Rule.error('Information required.').required(),
      ],
    }
  ],  
  
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      console.log(content[0]);
      console.log(content[0]._type);
      console.log(content[0].heading);
      return {
        title,
        subtitle: content[0]._type.charAt(0).toUpperCase() + content[0]._type.slice(1) + ' section'
      };
    },
  },
}
