export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  validation: Rule =>
    Rule.custom(
      (fields = {}) =>
        !fields.route || !fields.link || 'Only one link type is allowed'
    ),
  fieldsets: [
    {
      title: 'Link (*)',
      name: 'link',
      description: 'Choose one type of link',
      validation: Rule => Rule.error('Information required.').required(),
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Title (*)',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      title: 'Internal link',
      description: 'Use this route to link between routes from the website pages',
      name: 'route',
      type: 'reference',
      to: [{ type: 'route' }],
      fieldset: 'link',
    },
    {
      title: 'External link',
      name: 'link',
      type: 'url',
      fieldset: 'link',
    },
  ],
  preview: {
    select: {
      title: 'title',
      routeTitle: 'route.title',
      slug: 'route.slug.current',
      link: 'link',
    },
    prepare({ title, routeTitle = '', slug, link }) {
      const subtitleExtra = slug
        ? `Slug:/${slug}/`
        : link
        ? `External link: ${link}`
        : 'Not set';
      return {
        title: `${title}`,
        subtitle: `${routeTitle} ${subtitleExtra}`,
      };
    },
  },
};
