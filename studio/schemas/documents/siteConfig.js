export default {
  name: 'site-config',
  type: 'document',
  title: 'Site configuration',
  __experimental_actions: [/* "create", "delete", */ 'update', 'publish'], // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  fieldsets: [{ name: 'footer', title: 'Footer' }],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      name: "cookiesText",
      type: "localePortableText",
      title: "Cookies policy text"
    },
    {
      name: "newUpdatesText",
      type: "localePortableText",
      title: "Content update text to show in popup"
    },
    {
      name: 'frontpage',
      type: 'reference',
      description: 'Choose page to be the frontpage',
      to: { type: 'page' },
    },
  ],
};
