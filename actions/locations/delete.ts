"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("deleteValue");
  if (!locationId) return;

  await fetch(`${API_URL}/locations/${locationId}`, {
    method: "DELETE",
    headers: {
      ...(await AuthHeaders()),
    },
  });
  revalidateTag("dashboard:locations");
redirect("/dashboard")
}