"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";


export default async function updateProduct(productId: string, formData: FormData) {
  let product: any = {};
  for (const key of formData.keys()) {
    if (!key.includes("ACTION")) {
    product[key] = formData.get(key);
}
}
product.price = +product.price;
product.countSeal = +product.countSeal;
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: {
      ...(await AuthHeaders()),
      'content-type': "application/json"
    },
  })
   if (response.status === 200) {
    updateTag("dashboard:products")
    updateTag(`dashboard:products:${productId}`)
  }
}