import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@repo/database/client";
import { SIgnupFormSchema } from "../../../lib/zodSchema/authFormSchema";

const client = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    console.log("sending db data POST", username, email, password);

    //TODO YOU MAY WANT TO ADD SOME VALIDATION HERE
    const result = SIgnupFormSchema.safeParse({
      username,
      email,
      password,
    });

    if (!result.success) {
      const formatted = result.error.format();
      return formatted;
    }

    // email used
    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 404 }
      );
    }

    // hashing Password
    const hashedPassword = await hash(password, 10);

    // creating new user in db
    const newUser = await client.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      },
    });

    const newAccount = await client.account.create({
      data: {
        userId: newUser.id,
        type: "basicUser",
      },
    });

    return NextResponse.json({ message: "success", newUser, newAccount });
  } catch (error) {
    console.log(error);
  }
}
