// Combination of the language ISO 639-1 code (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
// and the country code TDL (https://en.wikipedia.org/wiki/Country_code_top-level_domain)
// for specific language & country combinations, such as "en_CA", "en_US", "ar_AE" or "fr_CA".
// **** THE "id" PROPERTY IT NEEDS TO MATCH THE LANGUAGE DOCUMENT'S "Language Tag" AND THE LANGUAGES'S "id" FROM "studio\schemas\supportedLanguages.js" ****

export default {
  supportedLanguages: [
    { id: 'en_CA', title: 'English (CA)' },
    { id: 'en_US', title: 'English (US)' },
    { id: 'en_AU', title: 'English (AU)' },
    { id: "fr_CA", title: "French (CA)" },
    { id: 'ar_AE', title: 'Arabic (AE)' },
  ],
  defaultLanguages: ['en_CA'], // It will ALWAYS be necessary to fill content in English (CA) when filling a locale field
  documentTypes: [
    'page',
    'textSection',
    'heroWithImage',
    'heroFirstVariation',
    'heroDoubleButton',
    'timeline',
    'hero',
    'imageBesideText',
    'doubleOptions',
    'mailchimp',
    'note',
    'quoteHeads',
    'awards',
    'fundsDisclaimer',
    'sideBySideImages',
    'keyBenefits',
    'benefitCard',
    'post',
    'country',
    'newsCard',
    'readMoreCard',
    'person',
    'team',
    'contactUsForm',
    'locationsDisplay',
    'location',
    'plainText',
    'textSeparator',
    'headlineWithImages',
    'descriptionsWithButton',
    'tabItem',
    'subscribeBlock',
    'fundsContent',
    'fundsOverview',
    'fundItem',
    'fundSidebarItem',
    'product',
    'category',
    'imagesContainer',
    'tableSection',
    'lineChart',
    'articles'
  ],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
