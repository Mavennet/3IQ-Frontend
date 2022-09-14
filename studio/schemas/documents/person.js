
import supportedLanguages from '../supportedLanguages';
import { UserIcon } from '@sanity/icons'

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: UserIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'profilePhoto',
      type: 'figure',
      title: 'Profile photo (*)',
      title: 'Contact Text',
      description: 'Recommended to add profile photos with 1:1 (square) proportion',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'jobTitle',
      type: 'localeString',
      title: 'Job title (*)',
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: 'linkedinUrl',
      type: 'url',
      title: 'Linkedin URL',
    },
    {
      name: 'contactText',
      type: 'localeString',
      title: 'Contact Text',
      description: 'If you fill the e-mail, it is necessary to fill the Contact Text field and vice-versa'
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-mail',
    },
    {
      name: 'readProfileText',
      type: 'localeString',
      title: 'Read Profile Text',
      description: 'If you fill the bio, it is necessary to fill the Read Profile Text field and vice-versa'
    },
    {
      name: 'bio',
      type: 'localeBioPortableText',
      title: 'Bio',
    }
  ],
  preview: {
    select: {
      name: 'name',
      media: 'profilePhoto',
      jobTitle: `jobTitle.${baseLanguage.id}`,
    },
    prepare({name = 'No name', media, jobTitle = 'No job title'}) {
      return {
        title: name,
        media,
        subtitle: jobTitle,
      }
    }
  }
}
