import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const prisma = new PrismaClient();

const now = new Date();
console.log(`process.env.TZ=${process.env.TZ}`);

const pgtz = await prisma.$queryRaw<unknown[]>`show timezone;`;
console.log(`Postgres [show timezone;]=${JSON.stringify(pgtz[0])}`);

console.log(`\nnow=${now.toISOString()}`);

const result = await prisma.timeTest.create({
  data: { t1: now },
});

console.log(` t1=${result.t1.toISOString()} (assigned to JS now)`);
console.log(` t2=${result.t2.toISOString()} (prisma set default value)`);
await prisma.$disconnect();
