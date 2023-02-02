import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "overflowHero",
  title: "Overflow Hero",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Name (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "title",
      type: "localeString",
      title: "Title (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "description",
      type: "localePortableText",
      title: "Text (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "backgroundImage",
      type: "image",
      title: "Image",
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: `heading`,
      media: "backgroundImage"
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Overflow Hero",
        media
      };
    }
  }
};
