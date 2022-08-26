import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default { // Não utilizado no momento --> podemos remover
  type: 'document',
  name: 'mailchimp',
  title: 'Mailchimp newsletter signup',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
    },
    {
      name: 'subtitle',
      type: 'localeString',
      title: 'Subheading',
    },
    {
      name: 'actionUrl',
      type: 'url',
      title: 'URL to Mailchimp signup',
      description:
        'URL for the Mailchimp signup form. Remember to add your domain in your mailchimp settings to avoid CORS errors.',
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Mailchimp Newsletter Signup section',
      };
    },
  },
};
