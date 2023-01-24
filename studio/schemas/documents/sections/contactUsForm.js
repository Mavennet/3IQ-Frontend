import { SplitHorizontalIcon } from "@sanity/icons";

export default {
  type: "document",
  name: "contactUsForm",
  title: "Contact Us Form",
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "heading",
      type: "localeString",
      title: "Heading (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "description",
      type: "localeString",
      title: "Description (*)",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "phoneNumber",
      type: "localeString",
      title: "Phone Number (*)",
      description: "Phone Number.",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "email",
      type: "localeString",
      title: "Email (*)",
      description: "Email.",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "schedule",
      type: "localeString",
      title: "Schedule (*)",
      description: "Schedule.",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "locations",
      description: "Select the locations that will be displayed",
      title: "Locations",
      validation: Rule => [
        Rule.max(5).warning("Are you sure you want more than 5 items?"),
        Rule.unique().error("You have duplicate locations"),
        Rule.error("Information required.").required(),
        Rule.min(1).error("Please, select at least 1 page section.")
      ],
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "location" }],
          title: "Location"
        }
      ]
    },
    {
      name: "contactUsFormSrc",
      type: "url",
      title: "Form Link (*)",
      description:
        "This is the link that will load the form fields in the website",
      validation: Rule => Rule.error("Information required.").required()
    },
    {
      name: "mainImage",
      type: "figure",
      title: "Main image (*)",
      validation: Rule => Rule.error("Information required.").required()
    }
  ],
  preview: {
    select: {
      title: `name`
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Contact Us Form section"
      };
    }
  }
};
