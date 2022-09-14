import supportedLanguages from '../supportedLanguages';
import { MdLinearScale } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'tabItem',
  type: 'document',
  title: 'Tab Item',
  icon: MdLinearScale,
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Tab item Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'contentBlock',
      type: 'localePortableText',
      title: 'Content Block (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'posts',
      type: 'array',
      title: 'Posts',
      validation: Rule => [
        Rule.max(3).error('Only 3 posts are allowed.'),
        Rule.unique().error('You have duplicate menu items.'),
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Read more posts Button',
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      postsLength: `posts.length`
    },
    prepare({ name, postsLength }) {
      const postsLengthText = postsLength > 0 ? postsLength + ' post(s) included' : 'No post included'
      return {
        title: `${name}`,
        subtitle: postsLengthText,
      }
    },
  }
}
