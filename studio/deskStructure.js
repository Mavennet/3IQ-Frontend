import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = (listItem) => !['page', 'route', 'site-config', 'post', 'category', 'country', 'language', 'person', 'route'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.documentListItem().id('global-config').schemaType('site-config').title('Site config'),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('route').title('Routes'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('country').title('Countries'),
      S.documentTypeListItem('language').title('Languages'),
      S.documentTypeListItem('person').title('People'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
