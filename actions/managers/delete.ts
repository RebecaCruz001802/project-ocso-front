"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(managerId: string, formData: FormData) {
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "DELETE",
    headers: {
      ...(await AuthHeaders()),
    },
  })
  console.log(response.status);
  revalidateTag("dashboard:managers", "max")
}