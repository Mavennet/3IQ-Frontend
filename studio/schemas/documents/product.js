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
      name: 'highlights',
      type: 'localeSimplePortableText',
      title: 'Highlights (*)',
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
    {
      title: 'Contact us Mailto link',
      name: 'mailtoLink',
      type: 'url',
      description: "Write the 'mailto:' link that will be used for e-mail contact",
      validation: Rule =>
        Rule.error('Information required.').required()
            .uri({
              allowRelative: true,
              scheme: ['mailto'],
            }),
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
