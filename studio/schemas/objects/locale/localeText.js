import supportedLanguages from '../supportedLanguages';

export default {
  title: 'Localized Text',
  name: 'localeText',
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
      type: 'text',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
