<<<<<<< HEAD
<<<<<<< Updated upstream
export * from "@prisma/client";
=======
=======
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
>>>>>>> Stashed changes
=======

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
