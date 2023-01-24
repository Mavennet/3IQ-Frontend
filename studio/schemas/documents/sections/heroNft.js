import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: 'document',
  name: 'heroNft',
  title: 'Hero NFT',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'First Heading (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'description',
      type: 'localeSimplePortableText',
      title: 'First Description',
    },
    {
      name: 'secondHeading',
      type: 'localeString',
      title: 'Second Heading',
      description: 'Optional heading for the text section above the content'
    },
    {
      name: 'secondDescription',
      type: 'localePortableText',
      title: 'Second Description (*)',
    },
    {
      name: 'videoSrc',
      type: 'string',
      title: 'YouTube video ID',
      description: 'Optional display of an YouTube video through its ID'
    },
    {
      name: 'videoDescription',
      type: 'localePortableText',
      title: 'Video Description',
    },
    {
      name: 'member',
      type: 'array',
      title: 'Team member',
      description: "Select the team members that are part of this team",
      validation: Rule => [
        Rule.max(1).error('Please, select at only 1 team member.'),
      ],
      of: [
        {
          type: 'reference',
          to: [
            {type: 'person'}
          ]
        }
      ]
    },
    {
      name: 'button',
      type: 'localeCta',
      title: 'Optional button',
      description: 'Optional button that will be displayed above the content'
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Hero NFT section',
      };
    },
  },
};
