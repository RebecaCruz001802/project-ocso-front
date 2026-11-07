"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { updateTag } from "next/cache";

export default async function updateManager(managerId: string, formData: FormData) {
    let provider: any = {};
    for (const key of formData.keys()) {
        provider[key] = formData.get(key);
    }
    const response = await fetch(`${API_URL}/providers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(provider),
        headers: {
            ...(await AuthHeaders()),
            "content-type": "application/json",
        },
    });
    if (response.ok) {
        updateTag("dashboard:providers");
        updateTag(`dashboard:providers:${managerId}`);
    }
}