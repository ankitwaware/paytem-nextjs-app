import * as z from "zod";

export const paymentInfoSchema = z.object({
  token: z.string({ message: "Invalid token" }),
  userId: z.string({ message: "Invalid userId" }),
  amount: z.string(),
});

export type paymentInfoType = z.infer<typeof paymentInfoSchema>;
