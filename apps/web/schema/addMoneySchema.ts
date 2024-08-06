import * as z from "zod";

export const addMoneySchema = z.object({
  amount: z.string().transform((stringMoney, ctx) => {
    const parsedNumber = parseFloat(stringMoney);
    if (isNaN(parsedNumber) || parsedNumber < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid amount",
      });

      // This is a special symbol you can use to
      // return early from the transform function.
      // It has type `never` so it does not affect the
      // inferred return type.
      return z.NEVER;
    }


    return stringMoney;
  }),
  bank: z.string(),
});

export type addMoneyInput = z.infer<typeof addMoneySchema>;
