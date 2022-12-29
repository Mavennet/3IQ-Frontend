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
      name: 'codes',
      type: 'array',
      title: 'Codes',
      description: 'Codes of the fund',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select at least 1 category'),
      ],
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      title: "Product Icon",
      name: "productIcon",
      type: "string",
      options: {
        list: [
          { title: "Bitcoin (Primary)", value: "bitcoin" },
          { title: "Ethereum (Secondary)", value: "ethereum" },
          { title: "Grow", value: "grow" },
          { title: "World", value: "global" }
        ],
        layout: "radio"
      }
    },
    {
      name: 'highlights',
      type: 'localeSimplePortableText',
      title: 'Highlights (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'observation',
      type: 'localeString',
      title: 'Observation',
      description: 'Text that will be displayed below the product(s) card(s)',
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
    {
      title: "Read More Button Color",
      name: "buttonColor",
      type: "string",
      options: {
        list: [
          { title: "Light Blue (Primary)", value: "solid" },
          { title: "Orange (Secondary)", value: "solidOrange" },
          { title: "Dark Blue", value: "solidDarkBlue" },
          { title: "White", value: "solidWhite" }
        ],
        layout: "radio"
      }
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      readMoreSlug: `readMoreRoute.slug.current`,
      media: 'mainImage',
    },
    prepare({ name = '', readMoreSlug, media }) {
      return {
        title: `${name}`,
        subtitle: 'Product details route: /' + readMoreSlug,
        media,
      }
    },
  }
}
