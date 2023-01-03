import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  // Não utilizado no momento --> podemos remover
  type: "document",
  name: "advertisement",
  title: "Advertisement",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "heading",
      type: "localeString",
      title: "Heading"
    },
    {
      name: "text",
      type: "localePortableText",
      title: "Advertisement Text"
    },
    {
      title: "Color",
      name: "color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "#0082E5" },
          { title: "Green", value: "#008C86" },
          { title: "Orange", value: "#F59B1E" },
          { title: "White", value: "#FFFFFF" }
        ],
        layout: "radio"
      }
    },
    {
      name: "button",
      type: "localeCta",
      title: "Advertisement Button"
    },
    {
      title: "Advertisement Button Color",
      name: "buttonColor",
      type: "string",
      options: {
        list: [
          { title: "Light Blue (Primary)", value: "solid" },
          { title: "Orange (Secondary)", value: "solidOrange" },
          { title: "Dark Blue", value: "solidDarkBlue" },
          { title: "White", value: "solidWhite" }
        ],
        layout: "radio"
      }
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Advertisement"
      };
    }
  }
};
