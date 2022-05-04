export default {
  supportedLanguages: [
    { "id": "en", "title": "English" },
    { "id": "fr", "title": "French" },
    { "id": "arb", "title": "Arabian" }
    //...
  ],
  // Select Norwegian (Bokmål) by default
  defaultLanguages: ['en'],
  // Only show language filter for document type `page` (schemaType.name)
  documentTypes: ['HeroWithImage'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
