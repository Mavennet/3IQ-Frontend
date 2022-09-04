import supportedLanguages from '../../supportedLanguages';

export default {
  title: 'Localized Bio Portable Text',
  name: 'localeBioPortableText',
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
      type: 'bioPortableText',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
