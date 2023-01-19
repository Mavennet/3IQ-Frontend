import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "highlights",
  title: "Highlights",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "heading",
      type: "localeString",
      title: "Heading"
    },
    {
      name: 'videoSrc',
      type: 'string',
      title: 'YouTube video ID',
      description: 'Optional display of an YouTube video through its ID'
    },
    {
      name: 'selectedPostCategory',
      title: 'Post Category (*)',
      description: "Select a category that will be used to automatically filter the 3 lastest Articles that has a post on the category selected, ordered by the post's 'Published at' date. **IMPORTANT: the automated News Card will only be visible if each of the 3 latest Posts for the selected category has a News Card that it is associated with**",
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.error('Information required.').required(),
    },
    {
      name: "firstButton",
      type: "localeCta",
      title: "First Button"
    },
    {
      name: "secondButton",
      type: "localeCta",
      title: "Second Button"
    },
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Highlights"
      };
    }
  }
};
