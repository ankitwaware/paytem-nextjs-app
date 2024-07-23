import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@repo/database/client";

const client = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    console.log("sending db data POST", username, email, password);

    //TODO YOU MAY WANT TO ADD SOME VALIDATION HERE

    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log("user existed", existingUser);
      return NextResponse.json(
        { message: "failed user in db", existingUser },
        { status: 403 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await client.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "success", newUser });
  } catch (error) {
    console.log(error);
  }
}
