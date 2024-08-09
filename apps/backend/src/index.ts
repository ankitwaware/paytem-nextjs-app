import express, { NextFunction, Request, Response } from "express";
import prisma from "@repo/database";
import * as z from "zod";
import cors from "cors";

const PORT = 3001;
const app = express();

app.use(cors());
// middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

const paymentInfoSchema = z.object({
  token: z.string({ message: "Invalid token" }),
  userId: z.string({ message: "Invalid userId" }),
  amount: z.string(),
});

type paymentInfoType = z.infer<typeof paymentInfoSchema>;

const bankPOSTHandler = async (req: Request, res: Response) => {
  const reqBody: paymentInfoType = req.body;
  console.log(reqBody);
  const result = paymentInfoSchema.safeParse(reqBody);

  if (!result.success) {
    return res.status(403).json({ message: "invalid details" });
  }

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(result.data.userId),
        },
        data: {
          amount: {
            increment: Number(result.data.amount) * 100,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: result.data.token,
          userId: Number(result.data.userId),
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.json({
      message: "Captured",
    });
  } catch (error) {
    console.log(error);
    return res.status(411).json({
      message: "Error while processing webhook",
    });
  }
};

// #10 added dummy bank_webhook_backend
app.post("/hdfcwebhook", bankPOSTHandler);
app.post("/axiswebhook", bankPOSTHandler);
app.post("/kotakwebhook", bankPOSTHandler);

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.message);
  return res.status(500).json({
    message: "I dont have that",
  });
};

app.use("/*", errorHandler);

app.listen(PORT, () => {
  console.log(`bank webhook running on port:${PORT}...`);
});
