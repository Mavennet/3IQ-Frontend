import { FolderIcon } from '@sanity/icons'

export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  icon: FolderIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'countries',
      title: 'Countries',
      description: 'Choose one or more countries to display this content into (empty for all countries)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'country'}}]
    }
  ]
}
