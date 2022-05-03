
import supportedLanguages from '../objects/supportedLanguages';
const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default {
  type: 'document',
  name: 'sectionHeroWithImage',
  title: 'Hero with Image',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading',
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Main image',
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
      name: 'ctas',
      type: 'array',
      title: 'Call to actions',
      of: [
        {
          title: 'Call to action',
          type: 'cta',
        },
      ],
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
        subtitle: 'Hero with image section',
        media,
      };
    },
  },
};
