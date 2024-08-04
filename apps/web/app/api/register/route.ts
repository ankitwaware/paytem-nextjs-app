import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@repo/database";
import { SIgnupFormSchema } from "../../../schema/authFormSchema";

export type signUpResBody = {
  message: string;
  username?: { name: "username"; message: string };
  email?: { name: "email"; message: string };
  number?: { name: "number"; message: string };
  password?: { name: "password"; message: string };
  data?: {
    email: string;
    password: string;
  };
};

export async function POST(request: Request) {
  try {
    const { username, email, password, number } = await request.json();

    console.log(
      "SIgn Up Data at /api/register POST",
      username,
      email,
      password,
      number,
      typeof number,
    );

    //VALIDATION FOR SIGNUP ON SERVER
    const result = SIgnupFormSchema.safeParse({
      username,
      email,
      password,
      number,
    });

    // input error
    if (!result.success) {
      const formatted = result.error.format();

      let messageString = "Please Enter Valid";

      if (formatted.username) messageString + "/username";
      if (formatted.email) messageString + "/email";
      if (formatted.password) messageString + "/password";
      if (formatted.number) messageString + "/number";

      return NextResponse.json<signUpResBody>(
        {
          message: messageString + ".",
          username: {
            name: "username",
            message: formatted.username?._errors[0]!,
          },
          email: {
            name: "email",
            message: formatted.email?._errors[0]!,
          },
          password: {
            name: "password",
            message: formatted.password?._errors[0]!,
          },
          number: {
            name: "number",
            message: formatted.number?._errors[0]!,
          },
        },
        { status: 403 },
      );
    }

    // email in databse
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        phoneNumber: number,
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json<signUpResBody>(
        {
          message:
            "Email and Number Already Used. Enter different email and number",
        },
        {
          status: 401,
        },
      );
    }

    // hashing Password
    const hashedPassword = await hash(password, 10);

    // creating new user in db
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        phoneNumber: number,
        balance: {
          create: {
            amount: 0,
            locked: 0,
          },
        },
      },
    });

    return NextResponse.json<signUpResBody>(
      {
        message: "Registration Success",
        data: {
          email,
          password,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json<signUpResBody>(
      { message: "Something Went Wrong.Try Again" },
      { status: 500 },
    );
  }
}
