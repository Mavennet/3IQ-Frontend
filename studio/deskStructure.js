import S from '@sanity/desk-tool/structure-builder'
import { MasterDetailIcon, SplitHorizontalIcon, LinkIcon } from '@sanity/icons'

const hiddenDocTypes = (listItem) => ![
  'page',
  'route',
  'site-config',
  'post',
  'country',
  'language',
  'person',
  'route',
  'hero',
  'heroWithImage',
  'imageBesideText',
  'doubleOptions',
  'imageWithText',
  'mailchimp',
  'sideBySideImages',
  'menuItem',
].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.documentListItem().id('global-config').schemaType('site-config').title('Site config'),
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
      S.divider(),S.listItem()
      .title('Sections')
      .icon(SplitHorizontalIcon)
      .child(
        S.list()
          .title('Sections')
          .items([
            S.documentTypeListItem('hero').title('Hero'),
            S.documentTypeListItem('heroWithImage').title('Hero with Image'),
            S.documentTypeListItem('imageBesideText').title('Image beside Text'),
            S.documentTypeListItem('sideBySideImages').title('Side by side Images'),
            S.documentTypeListItem('doubleOptions').title('Double Options'),
            // S.documentTypeListItem('imageWithText').title('Image'),
            // S.documentTypeListItem('mailchimp').title('Mailchimp Newsletter Signup'),
          ])
      ),
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('country').title('Countries'),
      S.documentTypeListItem('language').title('Languages'),
      S.divider(),
      S.documentTypeListItem('person').title('People'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
