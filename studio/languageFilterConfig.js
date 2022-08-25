export default {
  supportedLanguages: [
    { "id": "en_US", "title": "English (US)" },
    { "id": "en_CA", "title": "English (CA)" },
    { "id": "fr_CA", "title": "French (CA)" },
    { "id": "ar", "title": "Arabic" }, 
    {id: "pr", title: "Portuguese"},
    {id: "zh", title:"Chinese"},
    {id: "ru", title:"Russian"},
    {id: "nl", title:"Dutch"},
    {id: "de", title:"German"},
    {id: "es", title:"Spanish"},
    {id: "it", title:"Italian"},
    {id: "id", title:"Indonesian"},
    {id: "tl", title:"Tagalog"},
  ],
  defaultLanguages: ['en_US'], // With this property, there's no way to choose Canada without the default one --> English (US)
  documentTypes: [
    'page',
    'heroWithImage',
    'hero',
    'imageBesideText',
    'doubleOptions',
    'mailchimp',
    'sideBySideImages',
  ],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
