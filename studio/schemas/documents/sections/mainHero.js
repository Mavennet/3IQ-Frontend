import supportedLanguages from '../../supportedLanguages';
import { SplitHorizontalIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
    type: 'document',
    name: 'mainHero',
    title: 'Main Hero',
    icon: SplitHorizontalIcon,
    fields: [
        {
            name: 'heading',
            type: 'localeString',
            title: 'Heading (*)',
            validation: Rule => Rule.error('Information required.').required(),
        },
        {
            name: 'description',
            type: 'localePortableText',
            title: 'Description',
        },
        {
            name: 'backgroundImage',
            type: 'image',
            title: 'Background image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'button',
            type: 'localeCta',
            title: 'Optional button',
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
          name: 'firstBoxTitle',
          type: 'localeString',
          title: 'First Box Title',
        },
        {
          name: 'firstBoxDescription',
          type: 'localeString',
          title: 'First Box Description',
        },
        {
          name: 'secondBoxTitle',
          type: 'localeString',
          title: 'Second Box Title',
        },
        {
          name: 'secondBoxDescription',
          type: 'localeString',
          title: 'Second Box Description',
        },
        {
          name: 'thirdBoxTitle',
          type: 'localeString',
          title: 'Third Box Title',
        },
        {
          name: 'thirdBoxDescription',
          type: 'localeString',
          title: 'Third Box Description',
        },
    ],
    preview: {
        select: {
            title: `heading.${baseLanguage.id}`,
            media: 'backgroundImage',
        },
        prepare({ title, media }) {
            return {
                title,
                subtitle: 'Main Hero',
                media,
            };
        },
    },
};
