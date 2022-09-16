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
      title: 'Menu item Name (*)',
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
        Rule.unique().error('You have duplicate items.'),
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
      name: `name`,
      isLinkEnabled: `isLinkEnabled`,
      submenuRoutesLength: `submenuRoutes.length`
    },
    prepare({ name, isLinkEnabled, submenuRoutesLength }) {
      const isLinkEnabledText = isLinkEnabled ? 'Link enabled' : 'Link disabled'
      const submenuRoutesLengthText = submenuRoutesLength > 0 ? ' & ' + submenuRoutesLength + ' submenu route(s)' : ''
      return {
        title: `${name}`,
        subtitle: isLinkEnabledText + submenuRoutesLengthText,
      }
    },
  }
}
