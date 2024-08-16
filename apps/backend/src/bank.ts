import { Request, Response } from "express";
import prisma from "@repo/database/client";
import { paymentInfoType, paymentInfoSchema } from "../zod/schema";

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

export default bankPOSTHandler;
