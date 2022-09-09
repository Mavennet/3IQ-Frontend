import { MdMenu } from "react-icons/md";

export default {
  name: 'timelineItem',
  type: 'document',
  title: 'Timeline Item',
  icon: MdMenu,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Timeline item name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },    
    {
      name: 'dateText',
      type: 'localeString',
      title: 'Date text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },  
    {
      name: 'descriptionText',
      type: 'localeBioPortableText',
      title: 'Description text (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      text: 'dateText',
    },
    prepare({ name, text }) {
      return {
        title: `${name}`,
        subtitle: `${text}`,
      }
    },
  }
}
