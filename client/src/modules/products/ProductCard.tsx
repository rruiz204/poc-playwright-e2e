import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { Product } from "@core/models/Product";
import { Modal } from "@components/common/atoms/Modal";
import { Button } from "@components/common/atoms/Button";
import { ProductSchemaType } from "@core/schemas/ProductSchema";
import { useUpdateProduct } from "@core/hooks/product/useUpdateProduct";
import { useRemoveProduct } from "@core/hooks/product/useRemoveProduct";

import EditIcon from "@assets/svgs/edit-icon.svg";
import CancelIcon from "@assets/svgs/cancel-icon.svg";
import RemoveIcon from "@assets/svgs/remove-icon.svg";
import ConfirmIcon from "@assets/svgs/confirm-icon.svg"

interface Props {
  product: Product;
};

export const ProductCard = ({ product }: Props): JSX.Element => {
  const indicator = product.active ? "bg-green-400" : "bg-red-400";

  const [confirm, setConfirm] = useState<boolean>(false);
  const ToggleConfirm = () => setConfirm(!confirm);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const { UpdateProductHandler } = useUpdateProduct();
  const { RemoveProductHandler } = useRemoveProduct();

  const EditHandler = () => toggleIsOpen();

  const RemoveHandler = async () => {
    await RemoveProductHandler({ id: product.id });
  };

  const SubmitHandler = async (data: ProductSchemaType) => {
    await UpdateProductHandler({ ...data, id: product.id });
    toggleIsOpen();
  };

  return (
    <div test-id="product-card" className="border-2 border-cs-blue-700 w-[300px] py-2 px-4 rounded-md text-white">
      <div className="flex justify-between items-center">
        <p test-id="product-card-name" className="mb-2 font-semibold text-xl">{product.name}</p>
        <div className={`py-2 px-2 rounded-full cursor-pointer ${indicator}`}></div>
      </div>

      <p className="mb-2 line-clamp-3">{product.description}</p>

      <div className="flex justify-between items-center mb-4">
        <p test-id="product-card-price" className="font-semibold">${product.price}</p>
        <p test-id="product-card-stock" className="font-semibold">Stock: {product.stock}</p>
      </div>

      <div className="flex gap-2 mb-2">
        {!confirm && <Button text="Edit" icon={EditIcon} handler={EditHandler}
          role="button" theme="primary" />}

        {!confirm && <Button text="Remove" icon={RemoveIcon} handler={ToggleConfirm}
          role="button" theme="primary" />}

        {confirm && <Button text="Cancel" icon={CancelIcon} handler={ToggleConfirm}
          role="button" theme="positive" />}

        {confirm && <Button text="Confirm" icon={ConfirmIcon} handler={RemoveHandler}
          role="button" theme="negative" />}
      </div>

      <Modal isOpen={isOpen} onClose={toggleIsOpen} title="Update product">
        <ProductForm onSubmit={SubmitHandler} product={product} />
      </Modal>
    </div>
  );
};