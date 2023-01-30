import { BlockquoteIcon } from "@sanity/icons";

export default {
  type: "document",
  name: "newsCard",
  title: "News Card",
  icon: BlockquoteIcon,
  fields: [
    { name: "optionalTitle", type: "localeString", title: "Optional Title" },
    {
      name: "post",
      type: "reference",
      title: "Post (*)",
      description:
        "Select the post that this card should refer to. It is a good practice to keep only 1 News Card per Post, since it will avoid duplicates being displayed when enabling the News Cards Paginated Layout on a Tab Item",
      validation: Rule => Rule.error("Information required.").required(),
      to: [
        {
          type: "post"
        }
      ]
    },
    {
      name: "isInvertedLayout",
      type: "boolean",
      title: "Invert layout?",
      description:
        "Enable this option to invert the content and show the image on the right side",
      initialValue: false
    },
    {
      name: "hideHeader",
      type: "boolean",
      title: "Hide header layout?",
      description: "Enable this option to hide header ",
      initialValue: false
    },
    {
      name: "shortDescription",
      type: "localePortableText",
      title: "Short description",
      description:
        "Optional overview about the selected post for the normal-sized News Card"
    },
    {
      name: "smallCardText",
      type: "localeString",
      title: "Short text for compacted News Card",
      description:
        "Optional short text about the selected post that will be shown only in the compacted/small view of the News Card"
    },
    {
      name: "route",
      type: "reference",
      title: "Route (*)",
      description: "Select the route that points to this post's Page",
      validation: Rule => Rule.error("Information required.").required(),
      to: [
        {
          type: "route"
        }
      ]
    },
    {
      name: "newsletterNumber",
      type: "string",
      title: "Newsletter Number (*)",
      description: "Type a number if it's a Newsletter",
      validation: Rule => Rule.error("Information required.").max(4),
    },
    {
      name: "hideImage",
      type: "boolean",
      title: "Hide main image in mobile?",
      description: "Enable this option to hide main image in mobile resolution ",
      initialValue: false
    },
  ],
  preview: {
    select: {
      title: `post.name`,
      isInverted: `isInvertedLayout`
    },
    prepare({ title, isInverted }) {
      const isInvertedText = isInverted ? " - Inverted" : "";
      return {
        title,
        subtitle: "News Card section" + isInvertedText
      };
    }
  }
};
