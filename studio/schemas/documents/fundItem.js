import supportedLanguages from '../supportedLanguages';
import { MdInsights } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'fundItem',
  title: 'Fund Item',
  icon: MdInsights,
  fieldsets: [
    {
      title: 'Product Cards',
      name: 'productCards',
      description: 'Fill the fields below if you want to display the product cards',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Fund item Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'hiddenTitle',
      type: 'boolean',
      title: 'Hidden title in Fund Sections?',
      description: 'The title will be not visible',
      initialValue: false,
    },
    {
      name: 'fundSections',
      type: 'array',
      title: 'Fund sections',
      description: "Content that will be displayed in the page with the same order",
      of: [
        {
          type: 'reference',
          to: [
            {type: 'lineChart'},
            {type: 'tableSection'},
            {type: 'fundsOverview'},
            {type: 'articles'}
          ]
        }
      ]
    },
    {
      name: 'codeTitle',
      type: 'localeString',
      title: 'Code Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
      fieldset: 'productCards',
    },
    {
      name: 'codeObservation',
      type: 'localeString',
      title: 'Code Observation',
      fieldset: 'productCards',
    },
    {
      name: 'products',
      title: 'Products',
      description: 'Select the product(s) that will be displayed in order',
      fieldset: 'productCards',
      validation: Rule => [
        Rule.max(4).warning('Are you sure you want more than 4 items?'),
        Rule.unique().error('You have duplicate products'),
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
      name: 'textBetweenButtons',
      type: 'localeString',
      title: 'Text Between Buttons',
      fieldset: 'productCards',
    },
    {
      name: 'readMoreText',
      type: 'localeString',
      title: 'Read More Button text',
      description: 'Text that will be displayed in the Read More button for each product',
      fieldset: 'productCards',
    },
    {
      name: 'contactUsText',
      type: 'localeString',
      title: 'Contact Us Button text',
      description: 'Text that will be displayed in the Contact Us button for each product',
      fieldset: 'productCards',
    },
    {
      name: 'observation',
      type: 'localeString',
      title: 'Observation',
      description: 'Text that will be displayed below the product(s) card(s)',
      fieldset: 'productCards',
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
