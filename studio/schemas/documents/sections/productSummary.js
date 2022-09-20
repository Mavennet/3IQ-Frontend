import supportedLanguages from '../../supportedLanguages';
import { ComponentIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'productSummary',
  title: 'Product Summary',
  icon: ComponentIcon,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
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
      name: 'contactUsButton',
      type: 'localeCta',
      title: 'Contact Us Button (*)',
      description: 'Button that will be displayed in each product',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
      productsLength: `products.length`,
      media: 'products.0.mainImage',
    },
    prepare({ title = '', productsLength, media }) {
      const productsLengthText = productsLength > 0 ? ' - ' + productsLength + ' products(s)' : ''
      return {
        title,
        subtitle: 'Product Summary section' + productsLengthText,
        media,
      };
    },
  },
};
