import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWork } from "@Database/Core/UnitOfWork";
import type { ProductDTO } from "@UseCases/DTOs/ProductDTO";
import type { CreateProductCommand } from "./CreateProductCommand";

import { CreateProductSchema } from "./CreateProductSchema";
import { RedundancyException } from "@Exceptions/RedundancyException";

export class CreateProductUseCase implements UseCase<CreateProductCommand, ProductDTO> {
  constructor(private uow: UnitOfWork) {};

  public async execute(command: CreateProductCommand): Promise<ProductDTO> {
    await CreateProductSchema.validate(command);

    const existing = await this.uow.product.findByName(command.name);
    if (existing) throw new RedundancyException("This product is already registered");

    const created = await this.uow.product.create({ create: command });
    
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      price: created.price,
      stock: created.stock,
      active: created.active,
      createdAt: created.createdAt,
    };
  };
};