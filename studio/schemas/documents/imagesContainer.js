import supportedLanguages from '../supportedLanguages';
import { MdPhotoLibrary } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'imagesContainer',
  type: 'document',
  title: 'Images Container',
  icon: MdPhotoLibrary,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'isTitleHidden',
      type: 'boolean',
      title: 'Hide title?',
      description: 'Enable this option to not display the title. Recommended when only one images container will be used',
      initialValue: false,
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images (*)',
      validation: Rule => [
        Rule.error('Information required.').required(),
        Rule.min(1).error('Please, select an image.'),
      ],
      of: [
        {
          title: 'Image',
          type: 'figure',
        },
      ],
    }
  ],
  preview: {
    select: {
      name: `title.${baseLanguage.id}`,
      imagesLength: `images.length`,
    },
    prepare({ name, imagesLength }) {
      const imagesLengthText = imagesLength > 0 ? imagesLength + ' image(s) included' : 'No image included'
      return {
        title: `${name}`,
        subtitle: imagesLengthText,
      }
    },
  }
}
