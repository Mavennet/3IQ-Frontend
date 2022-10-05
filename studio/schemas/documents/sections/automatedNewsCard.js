import { SplitHorizontalIcon } from '@sanity/icons'

export default {
  type: 'document',
  name: 'automatedNewsCard',
  title: 'Automated News Card',
  icon: SplitHorizontalIcon,
  fields: [
    {
        name: 'name',
        type: 'string',
        title: 'Name (*)',
        validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category (*)',
      description: "Select a category that will be used to filter the lastest News Card that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if the latest Post for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'isInvertedLayout',
      type: 'boolean',
      title: 'Invert layout?',
      description: 'Enable this option to invert the content and show the image on the right side',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: `name`,
      isInverted: `isInvertedLayout`,
    },
    prepare({ title, isInverted }) {
      const isInvertedText = isInverted ? ' - Inverted' : ''
      return {
        title,
        subtitle: 'Automated News Card section' + isInvertedText
      }
    }
  }
}
