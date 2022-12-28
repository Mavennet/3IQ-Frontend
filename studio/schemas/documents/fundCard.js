import { MdCreditCard } from "react-icons/md";
import supportedLanguages from '../supportedLanguages';

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
    name: 'fundCard',
    title: 'Fund Card',
    type: 'document',
    icon: MdCreditCard,
    fields: [
        {
            name: 'heading',
            title: 'Heading (*)',
            type: 'localeString',
            validation: Rule => Rule.error('Information required.').required(),
        },
        {
            name: 'codes',
            type: 'array',
            title: 'Codes',
            of: [
                {
                    title: 'Code',
                    type: 'string',
                },

            ]
        }, {
            name: 'text',
            title: 'Text (*)',
            type: 'localeString',
            validation: Rule => Rule.error('Information required.').required(),
        },
        {
            name: 'dailyNav',
            title: 'Daily NAV (*)',
            type: 'localeString',
            validation: Rule => Rule.error('Information required.').required(),
        },

        {
            name: 'button',
            type: 'localeCta',
            title: 'Read More Button',
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'figure',
        },
    ],

    preview: {
        select: {
            title: `heading.${baseLanguage.id}`,
            media: 'backgroundImage',
        },
        prepare({ title = 'No title', media }) {
            return {
                title,
                media,
            }
        }
    }
}
