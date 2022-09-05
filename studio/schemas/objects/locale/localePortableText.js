import supportedLanguages from '../../supportedLanguages';

export default {
  title: 'Localized Portable Text',
  name: 'localePortableText',
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
      type: 'portableText',
      fieldset: lang.isDefault ? null : 'translations'
    }))
}
