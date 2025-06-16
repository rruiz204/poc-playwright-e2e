import { PrismaClient } from "generated/prisma";
import { Inversify } from "@Containers/Inversify";
import { Seeder } from "@Database/Seeders/Seeder";

import { AdminSeeder } from "@Database/Seeders/AdminSeeder";

const prisma = Inversify.get(PrismaClient);

const adminSeeder = new AdminSeeder(prisma);

const SeedRunner = async (seeders: Seeder[]) => {
  for (const seeder of seeders) {
    await seeder.seed();
  };
};

await SeedRunner([
  adminSeeder,
]);