import supportedLanguages from '../../objects/supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'mailchimp',
  title: 'Mailchimp newsletter signup',
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
        subtitle: 'Mailchimp newsletter signup section',
      };
    },
  },
};
