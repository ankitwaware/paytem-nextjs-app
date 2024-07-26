import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("123456", 10);

  const testUsers = await prisma.user.createMany({
    data: [
      {
        name: "test",
        email: "test@email.com",
        password: hashedPassword,
        phoneNumber: "123456789",
      },
      {
        name: "ankit",
        email: "ankit@email.com",
        password: hashedPassword,
        phoneNumber: "8668732956",
      },
    ],
  });

  console.log(testUsers);
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
