
import supportedLanguages from '../supportedLanguages';
import { MdSchedule } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'timelineItem',
  type: 'document',
  title: 'Timeline Item',
  icon: MdSchedule,
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
      text: `dateText.${baseLanguage.id}`,
    },
    prepare({ name, text }) {
      return {
        title: `${name}`,
        subtitle: `${text}`,
      }
    },
  }
}
