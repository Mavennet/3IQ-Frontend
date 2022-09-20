import supportedLanguages from '../supportedLanguages';
import { MdGeneratingTokens } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  icon: MdGeneratingTokens,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Product Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'readMoreRoute',
      type: 'reference',
      title: 'Read More Route (*)',
      description: "Select the route that points to this product's details page",
      validation: Rule => Rule.error('Information required.').required(),
      to: [
        {
          type: 'route',
        },
      ],
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      readMoreSlug: 'readMoreRoute.slug',
      media: 'mainImage',
    },
    prepare({ name = '', readMoreSlug, media }) {
      return {
        title: `${name}`,
        subtitle: 'Details route: ' + readMoreSlug,
        media,
      }
    },
  }
}
