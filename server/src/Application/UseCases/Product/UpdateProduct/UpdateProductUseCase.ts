import type { UseCase } from "@UseCases/UseCase";
import type { ProductDTO } from "@DTOs/ProductDTO";
import type { UnitOfWork } from "@Database/Core/UnitOfWork";
import type { UpdateProductCommand } from "./UpdateProductCommand";

import { NotFoundException } from "@Exceptions/NotFoundException";

export class UpdateProductUseCase implements UseCase<UpdateProductCommand, ProductDTO> {
  constructor(private uow: UnitOfWork) {};

  public async execute(command: UpdateProductCommand): Promise<ProductDTO> {
    const existing = await this.uow.product.findById(command.id);
    if (!existing) throw new NotFoundException("Product not found");

    const updated = await this.uow.product.update({
      id: existing.id, update: command,
    });

    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      price: updated.price,
      stock: updated.stock,
      active: updated.active,
      createdAt: updated.createdAt,
    };
  };
};