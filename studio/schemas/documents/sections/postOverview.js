import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'postOverview',
  title: 'Post Overview',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "post",
      type: "reference",
      title: "Post (*)",
      description:
        "Select the post that this card should refer to.",
      validation: Rule => Rule.error("Information required.").required(),
      to: [
        {
          type: "post"
        }
      ]
    },
    {
      name: 'leftContent',
      type: 'localePortableText',
      title: 'Left Content (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'rightContent',
      type: 'localePortableText',
      title: 'Right Content (*)',
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'localeString' }]
    }
  ],
  preview: {
    select: {
      title: `post.name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Post Overview section',
      };
    },
  },
};
