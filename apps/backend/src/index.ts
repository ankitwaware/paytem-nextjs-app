import express, { Request, Response } from "express";
import prisma from "@repo/database/client";
import { paymentInfoType, paymentInfoSchema } from "../zod/schema"
import cors from "cors";

const PORT = 3001;
const app = express();

app.use(cors());
// middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

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

app.get("/", (req, res) => {
  return res.json({ msg: "Healthy Server" });
});

// #10 added dummy bank_webhook_backend
app.post("/hdfcwebhook", bankPOSTHandler);
app.post("/axiswebhook", bankPOSTHandler);
app.post("/kotakwebhook", bankPOSTHandler);

app.listen(PORT, () => {
  console.log(`bank webhook running on port:${PORT}...`);
});
