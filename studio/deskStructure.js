import S from '@sanity/desk-tool/structure-builder'
import { MasterDetailIcon, SplitHorizontalIcon, LinkIcon, UsersIcon, CogIcon, ComponentIcon, TiersIcon } from '@sanity/icons'

const hiddenDocTypes = (listItem) => ![
  'page',
  'route',
  'site-config',
  'post',
  'country',
  'language',
  'person',
  'route',
  'textSection',
  'hero',
  'heroWithImage',
  'heroFirstVariation',
  'imageBesideText',
  'doubleOptions',
  'imageWithText',
  'mailchimp',
  'sideBySideImages',
  'menuItem',
  'newsCard',
  'readMoreCard',
  'team',
  'teamsDisplay',
  'timeline',
  'timelineItem',
  'contactUsForm',
  'locationsDisplay',
  'location',
  'textSeparator',
  'headlineWithImages',
  'descriptionsWithButton',
  'tabsContent',
  'tabItem',
  'subscribeBlock',
  'fundsContent',
  'fundItem',
  'product',
].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.documentListItem().id('global-config').schemaType('site-config').title('Site config').icon(CogIcon),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(MasterDetailIcon)
        .child(
          S.documentTypeList('country').title('Countries')
            .child(countryId =>
              S.documentTypeList('page').title('Pages')
                .filter('_type == "page" && $countryId in countries[]._ref')
                .params({ countryId })
            )
      ),
      S.listItem()
      .title('Routes')
      .icon(LinkIcon)
      .child(
        S.documentTypeList('country').title('Countries')
          .child(countryId =>
            S.documentTypeList('route').title('Routes')
              .filter('_type == "route" && $countryId in countries[]._ref')
              .params({ countryId })
          )
      ),
      S.divider(),
      S.listItem()
      .title('Page Sections')
      .icon(SplitHorizontalIcon)
      .child(
        S.list()
          .title('Page Sections')
          .items([
            S.documentTypeListItem('newsCard').title('News Card'),
            S.documentTypeListItem('readMoreCard').title('Read More Card'),
            S.documentTypeListItem('textSection').title('Text Block'),
            S.documentTypeListItem('textSeparator').title('Text Separator'),
            S.documentTypeListItem('hero').title('Hero'),
            S.documentTypeListItem('heroWithImage').title('Hero with Image'),
            S.documentTypeListItem('heroFirstVariation').title('Hero first variation'),
            S.documentTypeListItem('teamsDisplay').title('Teams Display'),
            S.documentTypeListItem('contactUsForm').title('Contact Us Form'),
            S.documentTypeListItem('locationsDisplay').title('Locations Display'),
            S.documentTypeListItem('sideBySideImages').title('Side by Side Images'),
            S.documentTypeListItem('subscribeBlock').title('Subscribe Block'),
            S.documentTypeListItem('headlineWithImages').title('Headline with Images'),
            S.documentTypeListItem('doubleOptions').title('Double Options'),
            S.documentTypeListItem('descriptionsWithButton').title('Descriptions with Button'),
            S.documentTypeListItem('tabsContent').title('Tabs Content'),
            S.documentTypeListItem('timeline').title('Timeline'),
            S.documentTypeListItem('imageBesideText').title('Image beside Text'),
          ])
      ),
      S.listItem()
      .title('Fund Sections')
      .icon(ComponentIcon)
      .child(
        S.list()
          .title('Fund Sections')
          .items([
            S.documentTypeListItem('fundsContent').title('Funds Content'),
          ])
      ),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.listItem()
      .title('Utilities')
      .icon(TiersIcon)
      .child(
        S.list()
          .title('Utilities')
          .items([
            S.documentTypeListItem('product').title('Product'),
            S.documentTypeListItem('fundItem').title('Fund Item'),
            S.documentTypeListItem('tabItem').title('Tab Item'),
            S.documentTypeListItem('menuItem').title('Menu Item'),
          ])
      ),
      S.divider(),
      S.documentTypeListItem('country').title('Countries'),
      S.documentTypeListItem('language').title('Languages'),
      S.divider(),
      S.listItem()
      .title('Teams')
      .icon(UsersIcon)
      .child(
        S.documentTypeList('country').title('Countries')
          .child(countryId =>
            S.documentTypeList('team').title('Teams')
              .filter('_type == "team" && $countryId in countries[]._ref')
              .params({ countryId })
          )
      ),
      S.documentTypeListItem('person').title('Members'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
