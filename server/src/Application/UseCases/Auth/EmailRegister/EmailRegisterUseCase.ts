import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { EmailRegisterCommand } from "./EmailRegisterCommand";

import { inject, injectable } from "inversify";
import { PrismaClient } from "generated/prisma";
import { EmailRegisterSchema } from "./EmailRegisterSchema";

import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { BcryptService } from "@Services/Password/BcryptService";


@injectable()
export class EmailRegisterUseCase implements UseCase<EmailRegisterCommand, AuthDTO> {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {};

  public async execute(command: EmailRegisterCommand): Promise<AuthDTO> {
    const validated = await EmailRegisterSchema.validate(command);
    
    const existing = await this.prisma.user.findUnique({ where: { email: validated.email } });
    if (existing) throw new LogicException.Redundancy("User already exists");

    const hashed = await BcryptService.hash(validated.password);
    const created = await this.prisma.user.create({
      data: {
        active: true,
        password: hashed,
        name: validated.name,
        email: validated.email,
      },
    });

    const token = await JwtService.sign({ id: created.id, expi: "1h" });
    return { type: "Bearer", token: token };
  };
};