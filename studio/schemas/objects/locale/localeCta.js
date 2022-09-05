import supportedLanguages from '../../supportedLanguages';

export default {
  title: 'Localized Call to Action',
  name: 'localeCta',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }
  ],
  fields: 
    supportedLanguages.map(lang => ({
      title: lang.title,
      name: lang.id,
      type: 'cta',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
