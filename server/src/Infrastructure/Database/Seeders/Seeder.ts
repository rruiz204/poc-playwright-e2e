import type { PrismaClient } from "@prisma/client";

export abstract class Seeder {
  constructor(protected prisma: PrismaClient) {};
  abstract seed(): Promise<void>;
};