"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteManager(managerId: string, formData: FormData) {
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "DELETE",
    headers: {
      ...(await AuthHeaders()),
    },
  })
  if (response.status === 200) {
    revalidateTag("dashboard:managers", "max")
    redirect("/dashboard/managers")
  }
}