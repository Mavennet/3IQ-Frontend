import { MdCreditCard } from "react-icons/md";
import supportedLanguages from '../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  icon: MdCreditCard,
  fields: [
    {
      name: 'heading',
      title: 'Heading (*)',
      type: 'localeString',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'text',
      title: 'Text (*)',
      type: 'localePortableText',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: 'mainImage',
    },
    prepare({ title = 'No title', media }) {
      return {
        title,
        media,
      }
    }
  }
}
