import { defineField, defineType } from 'sanity';

export const ingredient = defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Ingredient Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      amount: 'amount',
      unit: 'unit',
    },
    prepare({
      name,
      amount,
      unit,
    }: {
      name: string;
      amount?: string;
      unit?: string;
    }) {
      return {
        title: name,
        subtitle: [amount, unit].filter(Boolean).join(' '),
      };
    },
  },
});
