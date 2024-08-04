import * as z from "zod";
const PerToPerInputSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Nubmer must be at 10 digit." })
    .max(10, { message: "Phone Nubmer must be at 10 digit." })
    .transform((strNumber, ctx) => {
      const phoneNumber = parseInt(strNumber);

      if (isNaN(phoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter Valid Phone Number",
        });

        return z.NEVER;
      }

      return strNumber;
    }),
  amount: z.string().transform((strNumber, ctx) => {
    const phoneNumber = parseInt(strNumber);

    if (isNaN(phoneNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter Valid amount",
      });

      return z.NEVER;
    }

    return strNumber;
  }),
});

export default PerToPerInputSchema;
export type PerToPerInputType = z.infer<typeof PerToPerInputSchema>;
