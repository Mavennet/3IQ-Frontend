import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "webinarSubscribe",
  title: "Webinar Subscribe",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "heading",
      type: "localeString",
      title: "First Heading (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "dateLabel",
      type: "localeString",
      title: "Date Label"
    },
    {
      name: "hourLabel",
      type: "localeString",
      title: "Hour Label"
    },
    {
      name: "localLabel",
      type: "localeString",
      title: "Local Label"
    },
    {
      name: "date",
      type: "localeString",
      title: "Date"
    },
    {
      name: "hour",
      type: "localeString",
      title: "Hour"
    },
    {
      name: "local",
      type: "localeString",
      title: "Local"
    },
    {
      name: "formLabel",
      type: "localeString",
      title: "Local"
    },
    {
      name: "text",
      type: "localeSimplePortableText",
      title: "Text"
    },
    {
      name: "contactUsFormSrc",
      type: "url",
      title: "Form Link (*)",
      description:
        "This is the link that will load the form fields in the website",
      validation: Rule => Rule.error("Information required.").required()
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Hero NFT section"
      };
    }
  }
};
