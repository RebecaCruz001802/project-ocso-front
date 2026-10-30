"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createManager(managerId: string, formData: FormData) {
  let manager: any = {};
  for (const key of formData.keys()) {
    manager[key] = formData.get(key);
  }
  manager['managerSalary'] = +manager['managerSalary'];
  manager.location = +manager.location
  if (!manager?.location) delete manager?.location;
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "PATCH",
    body: JSON.stringify(manager),
    headers: {
      ...(await AuthHeaders()),
      'content-type': "application/json"
    },
  })
  if (response.status === 200) {
    revalidateTag("dashboard:managers", "max")
    revalidateTag(`dashboard:managers:${managerId}`, "max")
    redirect("/dashboard/managers");
  }
}