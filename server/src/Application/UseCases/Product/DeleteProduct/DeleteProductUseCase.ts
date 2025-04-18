import type { UseCase } from "@UseCases/UseCase";
import type { ProductDTO } from "@DTOs/ProductDTO";
import type { UnitOfWork } from "@Database/Core/UnitOfWork";
import type { DeleteProductCommand } from "./DeleteProductCommand";

import { NotFoundException } from "@Exceptions/NotFoundException";

export class DeleteProductUseCase implements UseCase<DeleteProductCommand, ProductDTO> {
  constructor(private uow: UnitOfWork) {};

  public async execute(command: DeleteProductCommand): Promise<ProductDTO> {
    const product = await this.uow.product.findById(command.id);
    if (!product) throw new NotFoundException("Product not found");

    const deleted = await this.uow.product.delete({ id: command.id });
    
    return {
      id: deleted.id,
      name: deleted.name,
      description: deleted.description,
      price: deleted.price,
      stock: deleted.stock,
      active: deleted.active,
      createdAt: deleted.createdAt,
    };
  };
};