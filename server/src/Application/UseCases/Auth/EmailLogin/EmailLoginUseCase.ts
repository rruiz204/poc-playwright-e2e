import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { EmailLoginCommand } from "./EmailLoginCommand";

import { inject, injectable } from "inversify";
import { PrismaClient } from "generated/prisma";
import { EmailLoginSchema } from "./EmailLoginSchema";

import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { BcryptService } from "@Services/Password/BcryptService";

@injectable()
export class EmailLoginUseCase implements UseCase<EmailLoginCommand, AuthDTO> {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {};

  public async execute(command: EmailLoginCommand): Promise<AuthDTO> {
    const validated = await EmailLoginSchema.validate(command);

    const existing = await this.prisma.user.findUnique({ where: { email: validated.email } });
    if (!existing) throw new LogicException.NotFound("User doesnt exists");

    const verified = await BcryptService.verify(validated.password, existing.password);
    if (!verified) throw new LogicException.BadCredentials("Bad credentials");

    const token = await JwtService.sign({ id: existing.id, expi: "1h" });
    return { type: "Bearer", token: token };
  };
};