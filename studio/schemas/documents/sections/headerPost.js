import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'headerPost',
  title: 'Header Post',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "post",
      type: "reference",
      title: "Post (*)",
      description:
        "Select the post that this card should refer to. It is a good practice to keep only 1 News Card per Post, since it will avoid duplicates being displayed when enabling the News Cards Paginated Layout on a Tab Item",
      validation: Rule => Rule.error("Information required.").required(),
      to: [
        {
          type: "post"
        }
      ]
    },
    {
      name: "fatherCategory",
      type: "localeString",
      title: "Father Category",
      description: "Ex: Research and Education"
    },
  ],
  preview: {
    select: {
      title: `post.name`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Header Post section',
      };
    },
  },
};
