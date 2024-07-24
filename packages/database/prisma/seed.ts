import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("123456", 10);

  const testUser = await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      email: "test@email.com",
      password: hashedPassword,
      name: "test",
    },
  });

  const newAccount = await prisma.account.create({
    data: {
      type: "basicUser",
      userId: testUser.id,
    },
    include: {
      user: true,
    },
  });

  const newSession = await prisma.session.create({
    data: {
      sessionToken: "createToeken",
      userId: testUser.id,
    },
    include: {
      user: true,
    },
  });

  console.log(testUser, newAccount, newSession);
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
