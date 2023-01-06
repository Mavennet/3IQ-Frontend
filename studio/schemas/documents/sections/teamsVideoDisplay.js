import supportedLanguages from "../../supportedLanguages";
import { SplitHorizontalIcon } from "@sanity/icons";

const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default {
  type: "document",
  name: "teamsVideoDisplay",
  title: "Main Hero",
  icon: SplitHorizontalIcon,
  fields: [
    {
        name: "heading",
        type: "localeString",
        title: "First Description",
    },
    {
        name: "description",
        type: "localePortableText",
        title: "First Description",
    },
    {
        name: "secondDescription",
        type: "localePortableText",
        title: "Second Description",
    },
    {
      name: "teams",
      type: "array",
      title: "Team member",
      description: "Select the team members that are part of this team",

      of: [
        {
          type: "reference",
          to: [{ type: "person" }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: `heading.${baseLanguage.id}`,
      media: "backgroundImage"
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Teams Video Display",
        media
      };
    }
  }
};
