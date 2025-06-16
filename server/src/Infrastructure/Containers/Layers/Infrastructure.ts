import { ContainerModule } from "inversify";
import { PrismaClient } from "generated/prisma";

export const Infrastructure = new ContainerModule((opts) => {
  opts.bind(PrismaClient).toConstantValue(new PrismaClient());
});