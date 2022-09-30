import supportedLanguages from '../supportedLanguages';
import { MdInsights } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'fundSidebarItem',
  title: 'Fund Item',
  icon: MdInsights,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image',
    },
    {
        name: 'text',
        type: 'localePortableText',
        title: 'Text',
      },
      {
        name: 'listImage',
        type: 'figure',
        title: 'List image',
      },
      {
        name: 'listItems',
        type: 'array',
        title: 'List Items',
        of: [{
          type: 'localeString',
          title: 'Item'
        }]
      },
      {
        name: 'observation',
        type: 'localeString',
        title: 'Observation'
      },
    
  ],
  preview: {
    select: {
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Fund Sidebar Item component',
      };
    },
  },
};
