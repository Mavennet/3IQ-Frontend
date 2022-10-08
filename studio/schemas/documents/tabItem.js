import supportedLanguages from '../supportedLanguages';
import { MdLinearScale } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'tabItem',
  type: 'document',
  title: 'Tab Item',
  icon: MdLinearScale,
  validation: Rule =>
    Rule.custom(
      (fields = {}) =>
        (fields.isPaginatedNewsletter && !fields.selectedPostCategory) ? "You need to select a Post Category in order to use the Paginated News Cards Layout." : true
    ),
  fieldsets: [
    {
      title: 'News Cards Layout Display',
      name: 'newsCardLayout',
      description: 'If you want to display the newest 3 News Cards (ordered by "Published At" date) of a Post Category, select the Category and disable the paginated flag. If you want the Paginated Layout, it is necessary to enable the paginated flag and select a Category. If you want none of those, keep the paginated flag as false and do not select any Category',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
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
      title: 'Content Block',
    },
    {
      name: 'isPaginatedNewsletter',
      type: 'boolean',
      title: 'Display News Cards with the Paginated Layout?',
      description: 'Enable this option to display all the News Cards with a pagination layout filtered by the category of the post referenced at the card. This layout will override the other layouts',
      initialValue: false,
      fieldset: 'newsCardLayout',
    },
    {
      name: 'isNewsCardsHorizontalLayout',
      type: 'boolean',
      title: 'News Cards with Horizontal layout?',
      description: 'Enable this option to display the selected News Cards with a horizontal layout (default display is vertical). This option does not work for Paginated Layout',
      initialValue: false,
      fieldset: 'newsCardLayout',
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category',
      description: 'Select a category that will be used to automatically filter News Cards based on the category of the post referenced at the card only for the Paginated News Cards layout',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'newsCardLayout',
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Read more posts Button',
      description: 'Optional button to show the route/link to more Posts',
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      selectedPostCategoryName: `selectedPostCategory.name.${baseLanguage.id}`,
      isPaginatedNewsletter: `isPaginatedNewsletter`,
    },
    prepare({ name, selectedPostCategoryName, isPaginatedNewsletter }) {
      const subtitleText = isPaginatedNewsletter ? 'Paginated News Cards from ' + selectedPostCategoryName : (selectedPostCategoryName ? 'News Cards from ' + selectedPostCategoryName : '')
      return {
        title: `${name}`,
        subtitle: subtitleText,
      }
    },
  }
}
