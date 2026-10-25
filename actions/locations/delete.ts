"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("deleteValue");
  if (!locationId) return;

  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return;

  await axios.delete(`${API_URL}/locations/${locationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}