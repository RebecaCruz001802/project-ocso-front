"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProvider(providerId: string, formData: FormData) {
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
        method: "DELETE",
        headers: {
            ...(await AuthHeaders()),
        },
    });
    console.log("DELETE provider:", response.status);
    if (response.ok) {
        updateTag("dashboard:providers");
        updateTag(`dashboard:providers:${providerId}`);
        redirect("/dashboard/providers");
    }
}