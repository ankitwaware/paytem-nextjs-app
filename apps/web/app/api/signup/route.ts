import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@repo/database/client";
import {
  SIgnupFormData,
  SIgnupFormSchema,
} from "../../../components/zod/authFormSchema";
import { SignUpResBody } from "../../../types/interfaces";


export async function POST(request: Request) {
  try {
    const { username, email, password, number } =
      (await request.json()) as SIgnupFormData;

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

      const messageString = `Please Enter Valid${formatted.username && "/username"}${formatted.email && "/email"}${formatted.password && "/password"}${formatted.number && "/number"}.`;

      return NextResponse.json<SignUpResBody>(
        {
          message: messageString,
          username: {
            name: "username",
            message: formatted.username?._errors[0],
          },
          email: {
            name: "email",
            message: formatted.email?._errors[0],
          },
          password: {
            name: "password",
            message: formatted.password?._errors[0],
          },
          number: {
            name: "number",
            message: formatted.number?._errors[0],
          },
        },
        { status: 403 },
      );
    }

    // email in databse
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        phoneNumber: number,
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
      },
    });

    if (existingUser) {
      return NextResponse.json<SignUpResBody>(
        {
          message:
            "Email and Number Already Used. Enter different email and number",
          email: {
            name: "email",
            message: "Enter different email",
          },
        },
        {
          status: 401,
        },
      );
    }

    // hashing Password
    const hashedPassword = await hash(password,10);

    // creating new user in db
    await prisma.user.create({
      data: {
        name: username,
        email,
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

    return NextResponse.json<SignUpResBody>(
      {
        message: "Registration Success",
        data: {
          email,
          password,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json<SignUpResBody>(
      { message: "Something Went Wrong.Try Again" },
      { status: 500 },
    );
  }
}
