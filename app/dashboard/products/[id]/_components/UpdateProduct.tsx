"use client";

import updateProduct from "@/actions/products/update";
import { Product, Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { LuCheck } from "react-icons/lu";
import SelectProvider from "../../_components/SelectProviders";

export default function UpdateProduct({product, providers}: {product: Product, providers: Provider[]}){
const { productId } = product;
const updateProductById = updateProduct.bind(null, productId)
return (
<form action={updateProductById} className="p-10 flex flex-col gap-4">
<Input name="productName" label="Nombre" defaultValue={product.productName} />
<Input name="countSeal" label="Num. de Sellos" defaultValue={String(product.countSeal)} />
<Input name="price" label="Precio" defaultValue={String(product.price)} />
<SelectProvider providers={ providers } defaultProvider={product.provider.providerId}/>
  <div className="flex flex-row flex-grow-0">
<Button type="submit" color="primary"><LuCheck size="20"/></Button>

</div>
</form>
)
}