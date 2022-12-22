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
