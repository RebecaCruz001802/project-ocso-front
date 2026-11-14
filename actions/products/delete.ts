"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProduct(productId: string, formData: FormData) {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      ...(await AuthHeaders()),
    },
  })
    if (response.status === 200) {
    updateTag("dashboard:products")
    redirect("/dashboard/products")
  }
}