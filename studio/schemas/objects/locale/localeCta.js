import supportedLanguages from '../supportedLanguages';

export default {
  title: 'Localized call to action',
  name: 'localeCta',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
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
