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
      name: 'route',
      type: 'reference',
      title: 'Internal link (*)',
      description: 'Use this route to link the page that will be attached to this menu item',
      validation: Rule => Rule.error('Information required.').required(),
      to: [{ type: 'route' }],
    },
    {
      name: 'isLinkEnabled',
      type: 'boolean',
      title: 'Enable clickable link?',
      description: 'Enable this option to allow the user to click on this menu item and be redirected to the selected route',
      initialValue: false,
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
