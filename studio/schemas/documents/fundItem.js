import supportedLanguages from '../supportedLanguages';
import { MdInsights } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'fundItem',
  title: 'Fund Item',
  icon: MdInsights,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Fund item Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'products',
      title: 'Products (*)',
      description: 'Select the product(s) that will be displayed in order',
      validation: Rule => [
        Rule.max(4).warning('Are you sure you want more than 4 items?'),
        Rule.unique().error('You have duplicate products'),
        Rule.min(1).error('Please, select at least 1 product.'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
          title: 'Product',
        },
      ],
    },
    {
      name: 'readMoreText',
      type: 'localeString',
      title: 'Read More Button text (*)',
      description: 'Text that will be displayed in the Read More button for each product',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'contactUsText',
      type: 'localeString',
      title: 'Contact Us Button text (*)',
      description: 'Text that will be displayed in the Contact Us button for each product',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      productsLength: `products.length`,
    },
    prepare({ title = '', productsLength }) {
      const productsLengthText = productsLength > 0 ? productsLength + ' fund item(s) included' : 'No fund item included'
      return {
        title,
        subtitle: productsLengthText,
      };
    },
  },
};
