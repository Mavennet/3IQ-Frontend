export default {
  supportedLanguages: [
    { "id": "en_US", "title": "English (US)" },
    { "id": "en_CA", "title": "English (CA)" },
    { "id": "fr", "title": "French" },
    { "id": "arb", "title": "Arabian" }
  ],
  defaultLanguages: ['en_US'], // With this property, there's no way to choose Canada without the default one --> English (US)
  documentTypes: [
    'page',
    'heroWithImage',
    'hero',
    'imageBesideText',
    'doubleOptions',
    'mailchimp'
  ],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
