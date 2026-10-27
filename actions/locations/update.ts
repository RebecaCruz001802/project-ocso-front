'use server';
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { TOKEN_NAME, API_URL } from "../../constants";
import { Location } from "../../entities";
import { AuthHeaders } from "@/helpers/authHeaders";

export async function updateLocation(store: string, formData: FormData) {
  const token = (await cookies()).get(TOKEN_NAME)?.value;
  if (!token) return;

  let location: any = {};
  let locationLatLng = [0, 0];
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        location[key] = formData.get(key);
      }
    }
  }
  location.locationLatLng = locationLatLng;
  if (location.manager) {
    location.manager = { managerId: location.manager };
  }
  const response = await fetch(`${API_URL}/locations/${store}`, {
    method: "PATCH",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeaders()),
    },
  })
  const { locationId }: Location = await response.json()
  if (response.status === 200) {
    revalidateTag("dashboard:locations", "max");
    revalidateTag(`dashboard:locations:${store}`, "max");
    redirect(`/dashboard?store=${locationId}`)
  }
}