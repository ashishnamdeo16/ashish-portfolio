import { defineType, defineField } from "sanity";

export const metaDescription = defineType({
  name: "metaDescription",
  title: "Meta Description",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().max(160).warning("Keep under 160 characters"),
    }),
  ],
});
