
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
      name: 'bio',
      type: 'localeBioPortableText',
      title: 'Bio (*)',
      validation: Rule => Rule.error('Information required.').required(),
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
