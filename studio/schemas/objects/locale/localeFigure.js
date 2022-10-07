import supportedLanguages from '../../supportedLanguages';

export default {
  title: 'Localized Figure',
  name: 'localeFigure',
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
      type: 'figure',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
