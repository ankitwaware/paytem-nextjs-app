import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

// add balances

async function main() {
  const hashedPassword = await hash("123456", 10);

  const testUser1 = await prisma.user.upsert({
    where: {
      email: "test@email.com",
    },
    update: {
      balance: {
        create: {
          amount: 99900,
          locked: 9900,
        },
      },
      onRampTransaction: {
        create: {
          status: "Success",
          token: "111",
          amount: 20000,
          provider: "hdfc bank",
          startTime: new Date(),
        },
      },
    },
    create: {
      name: "test",
      email: "test@email.com",
      password: hashedPassword,
      phoneNumber: "123456789",
      balance: {
        create: {
          amount: 99900,
          locked: 9900,
        },
      },
      onRampTransaction: {
        create: {
          status: "Success",
          token: "111",
          amount: 20000,
          provider: "hdfc bank",
          startTime: new Date(),
        },
      },
    },
    include: {
      balance: true,
      onRampTransaction: true,
    },
  });

  const testUser2 = await prisma.user.upsert({
    where: {
      email: "ankit@email.com",
    },
    update: {
      balance: {
        create: {
          amount: 99900,
          locked: 9900,
        },
      },
      onRampTransaction: {
        create: {
          status: "Success",
          token: "111",
          amount: 20000,
          provider: "hdfc bank",
          startTime: new Date(),
        },
      },
    },
    create: {
      name: "ankit",
      email: "ankit@email.com",
      password: hashedPassword,
      phoneNumber: "8668732956",
      balance: {
        create: {
          amount: 99900,
          locked: 9900,
        },
      },
      onRampTransaction: {
        create: {
          status: "Success",
          token: "121",
          amount: 20000,
          provider: "hdfc bank",
          startTime: new Date(),
        },
      },
    },
    include: {
      balance: true,
      onRampTransaction: true,
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
