import { useForm } from "react-hook-form";
import { Product } from "@core/models/Product";
import { Field } from "@components/common/Field";
import { Button } from "@components/common/Button";
import { Checkbox } from "@components/common/Checkbox";
import { TextArea } from "@components/common/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProductStore } from "@core/stores/useProductStore";
import { ProductSchema, ProductPayload } from "@core/schemas/ProductSchema";
import SaveIcon from "@assets/svgs/save-icon.svg";

export const ProductForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductPayload>({
    resolver: yupResolver(ProductSchema),
  });

  const addProduct = useProductStore((state) => state.addProduct);

  const onSubmit = handleSubmit((data) => {
    const product: Product = { ...data, id: Math.floor(Math.random() * 1000), createdAt: new Date() };
    addProduct(product);
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 px-4 py-6 border-2 border-cs-blue-500">
        <div>
          <Field<ProductPayload> label="name" type="text"
            place="Enter name" register={register} error={errors.name?.message} />
        </div>

        <div className="flex gap-2">
          <Field<ProductPayload> label="price" type="text"
            place="Enter price" register={register} error={errors.price?.message} />
          <Field<ProductPayload> label="stock" type="text"
            place="Enter stock" register={register} error={errors.stock?.message} />
        </div>

        <TextArea rows={4} register={register} label="description" place="Enter description"
          error={errors.description?.message} />

        <div className="flex justify-end">
          <Checkbox<ProductPayload> label="active" register={register}></Checkbox>
        </div>

        <Button text="Save" role="submit" icon={SaveIcon} theme="primary"></Button>
        {/* {error && <p className="text-red-600 font-semibold text-center">{error.message}</p>} */}
      </form>
    </div>
  );
};