import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const testUser1 = await prisma.user.upsert({
    where: {
      email: "test@email.com",
      phoneNumber: "1234567891",
    },
    update: {},
    create: {
      name: "test",
      email: "test@email.com",
      password: hashedPassword,
      phoneNumber: "1234567891",
      balance: {
        create: {
          amount: 0,
          locked: 0,
        },
      },
    },
  });

  const testUser2 = await prisma.user.upsert({
    where: {
      email: "ankit@email.com",
      phoneNumber: "1234569875",
    },
    update: {},
    create: {
      name: "ankit",
      email: "ankit@email.com",
      password: hashedPassword,
      phoneNumber: "1234569875",
      balance: {
        create: {
          amount: 0,
          locked: 0,
        },
      },
    },
  });

  console.log(testUser1, testUser2);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
