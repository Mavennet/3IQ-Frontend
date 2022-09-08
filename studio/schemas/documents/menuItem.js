import { MdMenu } from "react-icons/md";

export default {
  name: 'menuItem',
  type: 'document',
  title: 'Menu Item',
  icon: MdMenu,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Menu item name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      title: 'Internal link (*)',
      description: 'Use this route to link between pages on the website',
      name: 'route',
      type: 'reference',
      to: [{ type: 'route' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      title: 'Submenu routes',
      name: 'submenuRoutes',
      type: 'array',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate menu items.'),
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }],
        },
      ],
    }
  ],
  preview: {
    select: {
      name: 'name',
      link: 'link',
    },
    prepare({ name, link }) {
      return {
        title: `${name}`,
        subtitle: link ? `${link}` : '',
      }
    },
  }
}
