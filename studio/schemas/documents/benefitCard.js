import { MdCreditCard } from "react-icons/md";
import supportedLanguages from '../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'benefitCard',
  title: 'Benefit Card',
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
      type: 'localeString',
      validation: Rule => Rule.error('Information required.').required(),
    },
    // to remove
    {
      name: 'body',
      title: 'Body (*)',
      type: 'localePortableText',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      title: "Card Color",
      name: "cardColor",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "#0082E5" },
          { title: "Yellow", value: "#F59B1E" },
          { title: "Dark Blue", value: "#0D1C3D" },
        ],
        layout: "radio"
      }
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
