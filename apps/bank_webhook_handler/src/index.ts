import express from "express";
import { PrismaClient } from "@repo/database/client";
import * as z from "zod";
import cors from "cors";

const app = express();

// middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(cors());
app.use(express.json());

const paymentInfoSchema = z.object({
  token: z.string({ message: "Invalid token" }),
  userId: z.string({ message: "Invalid userId" }),
  amount: z.string(),
});

type paymentInfoType = z.infer<typeof paymentInfoSchema>;
const client = new PrismaClient();

app.get("/hey", (req, res) => {
  return res.json({
    msg: "all good at server",
  });
});

// #10 added dummy bank_webhook_backend 
app.post("/hdfcwebhook", async (req, res) => {
  const reqBody: paymentInfoType = req.body;
  console.log("req body", reqBody);
  const result = paymentInfoSchema.safeParse(reqBody);

  if (!result.success) {
    return res.status(403).json({ message: "invalid details" });
  }

  try {
    await client.$transaction([
      client.balance.update({
        where: {
          userId: Number(result.data.userId),
        },
        data: {
          amount: {
            increment: Number(result.data.amount),
          },
        },
      }),
      client.onRampTransaction.update({
        where: {
          token: result.data.token,
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
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(8080, () => {
  console.log("bank webhook running...8080");
});
