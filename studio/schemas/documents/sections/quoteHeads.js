import { ComponentIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'quoteHeads',
  type: 'document',
  title: 'Live Feed Cards',
  icon: ComponentIcon,
  fields: [
    {
      name: 'symbols',
      title: 'Symbols (*)',
      description: 'Choose the symbols/tickers from Toronto Stock Exchange that will be displayed in both cards',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(2).max(2).error('Please, select 2 symbols.'),
      ],
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      firstSymbol: `symbols.0`,
      secondSymbol: `symbols.1`,
    },
    prepare({ firstSymbol, secondSymbol }) {
      return {
        title: 'Tickers: ' + firstSymbol + ' & '+ secondSymbol,
        subtitle: 'Live Feed Cards section',
      };
    },
  },
}
