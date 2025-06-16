import { Seeder } from "./Seeder";
import { PrismaClient } from "generated/prisma";
import { AdminConfig } from "@Configs/AdminConfig";
import { BcryptService } from "@Services/Password/BcryptService";

export class AdminSeeder extends Seeder {
  constructor(prisma: PrismaClient) {super(prisma)};

  public async seed(): Promise<void> {
    const hashed = await BcryptService.hash(AdminConfig.ADMIN_PASSWORD);

    const payload = {
      name: AdminConfig.ADMIN_NAME,
      email: AdminConfig.ADMIN_EMAIL,
      password: hashed,
    };

    await this.prisma.user.upsert({
      update: payload,
      create: payload,
      where: { email: AdminConfig.ADMIN_EMAIL },
    });
  };
};