import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "articlesSearch",
  title: "Articles Search",
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
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Articles Search Section",
        media
      };
    }
  }
};
