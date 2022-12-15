import { EarthAmericasIcon } from '@sanity/icons'

export default {
  name: 'country',
  type: 'document',
  title: 'Country',
  icon: EarthAmericasIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'urlTag',
      type: 'string',
      title: 'URL tag (*)',
      description: 'Language ISO 639-1 code (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for the URL internationalization, such as "ca", "us" or "ae".',
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'languages',
      title: 'Languages (*)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'language'}}],
      description: "Languages that will be available at the website header's language picker",
      validation: Rule => Rule.error('Information required.').required()
    },
    {
      name: 'headerLogo',
      type: 'localeFigure',
      title: 'Header logo (*)',
      description: "Best choice is to use a transparent PNG file",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainNavigation',
      description: 'Select pages for the top menu',
      title: 'Main navigation',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'menuItem' }],
          title: 'Menu item',
        },
      ],
    },
    {
      name: 'footerLogo',
      type: 'localeFigure',
      title: 'Footer logo (*)',
      description: "Best choice is to use a transparent PNG file",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerFirstLeftBlockImage',
      type: 'figure',
      title: 'Footer first left block image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerFirstLeftBlockContent',
      type: 'localePortableText',
      title: 'Footer first left block content (*)',
      description: "First block of content that will be shown below the footer logo",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerSecondLeftBlockImage',
      type: 'figure',
      title: 'Footer second left block image (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerSecondLeftBlockContent',
      type: 'localePortableText',
      title: 'Footer second left block content (*)',
      description: "Second block of content that will be shown below the footer logo",
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerSecondLeftBlockButton',
      type: 'localeCta',
      title: 'Footer second left block button (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'footerNavigation',
      type: 'array',
      title: 'Footer navigation',
      description: 'Select pages for the footer main links',
      validation: Rule => Rule.unique().error('You have duplicate links'),
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }],
          title: 'Route',
        },
      ],
    },
    {
      name: 'newsletterBody',
      type: 'localePortableText',
      title: 'Newsletter Subscribe content',
      description: "Content that will be shown above the user's e-mail input field",
    },
    {
      name: 'newsletterSubscribeSrc',
      type: 'url',
      title: 'Newsletter Subscribe Link (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'followUsText',
      type: 'localeString',
      title: 'Follow us text',
      description: "Title of the footer's social media section",
    },
    {
      name: 'shareThisStoryText',
      type: 'localeString',
      title: 'Share this Story text',
      description: "Social media share text that will be displayed on each Post page",
    },
    {
      name: 'twitterUrl',
      type: 'url',
      title: 'Twitter URL',
    },
    {
      name: 'linkedinUrl',
      type: 'url',
      title: 'Linkedin URL',
    },
    {
      name: 'youtubeUrl',
      type: 'url',
      title: 'Youtube URL',
    },
    {
      name: 'footerBottomContent',
      type: 'localePortableText',
      title: 'Footer bottom content (*)',
      description: "Content that will be shown at the end of the page (preferably one line of text/URLs)",
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      urlTag: 'urlTag'
    },
    prepare({ name, urlTag }) {
      return {
        title: `${name}`,
        subtitle: `/${urlTag}`,
      }
    },
  },
}
