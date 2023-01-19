import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "search",
  title: "Search",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "heading",
      type: "localeString",
      title: "First Description"
    },
    {
      name: "notFoundText",
      type: "localePortableText",
      title: "Not Found Text"
    },
    {
      name: "buttonText",
      type: "localeString",
      title: "Button Text"
    },
    {
      name: "articlesLabel",
      type: "localeString",
      title: "Articles Label"
    },
    {
      name: "whitePapersLabel",
      type: "localeString",
      title: "White Papers Label"
    },
    {
      name: "videosLabel",
      type: "localeString",
      title: "Videos Label"
    },
    {
      name: "podcastsLabel",
      type: "localeString",
      title: "Podcasts Label"
    },
    {
      name: "webinarsLabel",
      type: "localeString",
      title: "Webinars Label"
    },
    {
      name: "newslettersLabel",
      type: "localeString",
      title: "Newsletters Label"
    },
    {
      name: "newsLabel",
      type: "localeString",
      title: "News Label"
    },
    {
      name: "pressReleasesLabel",
      type: "localeString",
      title: "Press Releases Label"
    },

  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Search Section",
        media
      };
    }
  }
};
