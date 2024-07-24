import * as z from "zod";

const SIgnupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});



const SIgnInFormSchema = SIgnupFormSchema.omit({ username: true });

export type SIgnInFormData = z.infer<typeof SIgnInFormSchema>;

export type SIgnupFormData = z.infer<typeof SIgnupFormSchema>; 

export {SIgnupFormSchema,SIgnInFormSchema,}
