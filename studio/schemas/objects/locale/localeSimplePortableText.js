import supportedLanguages from '../../supportedLanguages';

export default {
  title: 'Localized Simple Portable Text',
  name: 'localeSimplePortableText',
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
      type: 'simplePortableText',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
