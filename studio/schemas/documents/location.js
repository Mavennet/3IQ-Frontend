import supportedLanguages from '../supportedLanguages';
import { MdLocationOn } from "react-icons/md";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  icon: MdLocationOn,
  validation: Rule =>
    Rule.custom(
      (fields = {}) =>
        !fields.mainImage || !fields.googleMapsSrc || 'You can either choose an image or a link to Google Maps for the location'
    ),
  fieldsets: [
    {
      title: 'Reference (*)',
      name: 'reference',
      description: 'Choose an image or a link to Google Maps',
      validation: Rule => Rule.error('Information required.').required(),
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
      title: 'Location name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'mainImage',
      type: 'figure',
      title: 'Image (*)',
      fieldset: 'reference',
    },
    {
      name: 'googleMapsSrc',
      type: 'url',
      title: 'Google Maps Link (*)',
      description: "This is the link that will load the Google Maps reference in the website",
      fieldset: 'reference',
    },
    {
      name: 'redirectLink',
      type: 'localeCta',
      title: 'Link to redirect the user'
    },
    {
      name: 'isMetaverse',
      type: 'boolean',
      title: 'Link to metaverse?'
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
  ],
  preview: {
    select: {
      name: `name.${baseLanguage.id}`,
      image: 'mainImage',
      googleMapsSrc: 'googleMapsSrc',
    },
    prepare({ name, image, googleMapsSrc }) {
      return {
        title: `${name}`,
        subtitle: googleMapsSrc ? "Google Maps reference" : "Image reference",
        media: image,
      }
    },
  }
}
