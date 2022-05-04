import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = (listItem) => ![
  'page',
  'route',
  'site-config',
  'post',
  'category',
  'country',
  'language',
  'person',
  'route',
  'hero',
  'heroWithImage',
  'imageBesideText',
  'imageWithText',
  'mailchimp',
].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.documentListItem().id('global-config').schemaType('site-config').title('Site config'),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.listItem()
        .title('Sections')
        .child(
          S.list()
            .title('Sections')
            .items([
              S.documentTypeListItem('hero').title('Hero'),
              S.documentTypeListItem('heroWithImage').title('Hero with Image'),
              S.documentTypeListItem('imageBesideText').title('Image beside Text'),
              S.documentTypeListItem('imageWithText').title('Image'),
              S.documentTypeListItem('mailchimp').title('Mailchimp Newsletter Signup'),
            ])
        ),
      S.documentTypeListItem('route').title('Routes'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.documentTypeListItem('country').title('Countries'),
      S.documentTypeListItem('language').title('Languages'),
      S.divider(),
      S.documentTypeListItem('person').title('People'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
