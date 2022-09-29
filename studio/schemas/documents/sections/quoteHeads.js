import { SplitHorizontalIcon } from '@sanity/icons'
import supportedLanguages from '../../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'quoteHeads',
  type: 'document',
  title: 'Live feed cards (Quote Heads)',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'symbols',
      title: 'Symbols (*)',
      description: 'Choose the symbols that will be displayed in both cards',
      type: 'array',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(2).max(2).error('Please, select 2 symbols.'),
      ],
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Live feed cards (Quote Heads)',
        subtitle: 'Live feed cards (quote heads) section'
      };
    },
  },
}
