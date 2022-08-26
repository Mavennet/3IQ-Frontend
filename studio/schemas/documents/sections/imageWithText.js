import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default { // Não utilizado no momento --> podemos remover
  type: 'document',
  name: 'imageWithText',
  title: 'Image with text',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'label',
      type: 'localeString',
      title: 'Label (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'text',
      type: 'simplePortableText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Main button (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      subtitle: 'label',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Image section',
        media,
      };
    },
  },
};
