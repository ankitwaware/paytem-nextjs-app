import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@repo/database/client";
import { SIgnupFormSchema } from "../../../lib/zodSchema/authFormSchema";

const client = new PrismaClient();

export type signUpResBody = {
  message: string;
  username?: { name: "username"; message: string };
  email?: { name: "email"; message: string };
  password?: { name: "password"; message: string };
  data?: {
    email: string;
    password: string;
  };
};

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    console.log(
      "SIgn Up Data at /api/register POST",
      username,
      email,
      password,
    );

    //VALIDATION FOR SIGNUP ON SERVER
    const result = SIgnupFormSchema.safeParse({
      username,
      email,
      password,
    });

    // input error
    if (!result.success) {
      const formatted = result.error.format();

      let messageString = "Please Enter Valid";

      if (formatted.username) messageString + "/username";
      if (formatted.email) messageString + "/email";
      if (formatted.password) messageString + "/password";

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
        },
        { status: 403 },
      );
    }

    // email in databse
    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json<signUpResBody>(
        {
          message: "Email Already Used. Enter different email",
        },
        {
          status: 401,
        },
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

    await client.account.create({
      data: {
        userId: newUser.id,
        type: "basicUser",
      },
    });

    return NextResponse.json<signUpResBody>(
      {
        message: "Registration Success",
        data: { email: email, password: password },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json<signUpResBody>(
      { message: "Something Went Wrong.Try Again" },
      { status: 500 },
    );
  }
}
