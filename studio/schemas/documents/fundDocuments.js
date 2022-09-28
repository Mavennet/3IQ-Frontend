import supportedLanguages from '../supportedLanguages';
import { MdInsights } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'fundDocuments',
  title: 'Fund Item',
  icon: MdInsights,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
        name: 'text',
        type: 'localePortableText',
        title: 'Text (*)',
        validation: Rule => Rule.error('Information required.').required(),
      },
    
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Fund Documents component',
      };
    },
  },
};
