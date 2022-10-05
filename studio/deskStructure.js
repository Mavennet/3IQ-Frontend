import S from '@sanity/desk-tool/structure-builder'
import { MasterDetailIcon, SplitHorizontalIcon, LinkIcon, UsersIcon, CogIcon, ComponentIcon, TiersIcon, DocumentIcon, BlockquoteIcon } from '@sanity/icons'

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
  'heroDoubleButton',
  'imageBesideText',
  'doubleOptions',
  'imageWithText',
  'mailchimp',
  'keyBenefits',
  'benefitCard',
  'note',
  'quoteHeads',
  'readyToInvest',
  'awards',
  'fundsDisclaimer',
  'sideBySideImages',
  'menuItem',
  'newsCard',
  'automatedNewsCard',
  'readMoreCard',
  'team',
  'teamsDisplay',
  'timeline',
  'timelineItem',
  'contactUsForm',
  'locationsDisplay',
  'location',
  'plainText',
  'textSeparator',
  'headlineWithImages',
  'descriptionsWithButton',
  'tabsContent',
  'tabItem',
  'subscribeBlock',
  'fundsContent',
  'fundsOverview',
  'fundItem',
  'fundSidebarItem',
  'product',
  'category',
  'imagesContainer',
  'lineChart',
  'tableSection',
  'articles'
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
              S.documentTypeListItem('automatedNewsCard').title('Automated News Card'),
              S.documentTypeListItem('contactUsForm').title('Contact Us Form'),
              S.documentTypeListItem('descriptionsWithButton').title('Descriptions with Button'),
              S.documentTypeListItem('doubleOptions').title('Double Options'),
              S.documentTypeListItem('headlineWithImages').title('Headline with Images'),
              S.documentTypeListItem('hero').title('Hero'),
              S.documentTypeListItem('heroDoubleButton').title('Hero with 2 Buttons'),
              S.documentTypeListItem('heroFirstVariation').title('Hero first variation'),
              S.documentTypeListItem('heroWithImage').title('Hero with Image'),
              S.documentTypeListItem('imageBesideText').title('Image beside Text'),
              S.documentTypeListItem('keyBenefits').title('Key Benefits'),
              S.documentTypeListItem('locationsDisplay').title('Locations Display'),
              S.documentTypeListItem('newsCard').title('News Card'),
              S.documentTypeListItem('readMoreCard').title('Read More Card'),
              S.documentTypeListItem('sideBySideImages').title('Side by Side Images'),
              S.documentTypeListItem('subscribeBlock').title('Subscribe Block'),
              S.documentTypeListItem('tabsContent').title('Tabs Content'),
              S.documentTypeListItem('teamsDisplay').title('Teams Display'),
              S.documentTypeListItem('textSection').title('Text Block'),
              S.documentTypeListItem('plainText').title('Plain Text'),
              S.documentTypeListItem('post').title('Post'),
              S.documentTypeListItem('textSeparator').title('Text Separator'),
              S.documentTypeListItem('timeline').title('Timeline'),
            ])
      ),
      S.listItem()
        .title('Fund Sections')
        .icon(ComponentIcon)
        .child(
          S.list()
            .title('Fund Sections')
            .items([
              S.documentTypeListItem('awards').title('Awards'),
              S.documentTypeListItem('readyToInvest').title('Ready To Invest'),
              S.documentTypeListItem('fundsOverview').title('Funds Overview'),
              S.documentTypeListItem('fundsDisclaimer').title('Funds Disclaimer'),
              S.documentTypeListItem('note').title('Compact Notes'),
              S.documentTypeListItem('tableSection').title('Custom Table'),
              S.documentTypeListItem('fundsContent').title('Funds Content'),
              S.documentTypeListItem('lineChart').title('Line Chart'),
              S.documentTypeListItem('articles').title('Articles'),
              S.documentTypeListItem('quoteHeads').title('Live Feed Cards'),
            ])
      ),
      S.divider(),
      S.listItem()
        .title('Posts')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('category').title('Categories')
            .child(categoryId =>
              S.documentTypeList('post').title('Posts')
                .filter('_type == "post" && $categoryId in categories[]._ref')
                .params({ categoryId })
            )
      ),
      S.listItem()
        .title('News Cards')
        .icon(BlockquoteIcon)
        .child(
          S.documentTypeList('category').title('Categories')
            .child(categoryId =>
              S.documentTypeList('newsCard').title('News Cards')
                .filter('_type == "newsCard" && $categoryId in post->categories[]._ref')
                .params({ categoryId })
            )
      ),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.listItem()
        .title('Utilities')
        .icon(TiersIcon)
        .child(
          S.list()
            .title('Utilities')
            .items([
              S.documentTypeListItem('benefitCard').title('Benefit Card'),
              S.documentTypeListItem('fundItem').title('Fund Item'),
              S.documentTypeListItem('fundSidebarItem').title('Fund Sidebar Item'),
              S.documentTypeListItem('imagesContainer').title('Images Container'),
              S.documentTypeListItem('menuItem').title('Menu Item'),
              S.documentTypeListItem('product').title('Product'),
              S.documentTypeListItem('tabItem').title('Tab Item'),
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
