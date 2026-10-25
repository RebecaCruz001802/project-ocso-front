'use server';
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { TOKEN_NAME, API_URL } from "../../constants";
import { AuthHeaders } from "@/helpers/authHeaders";

export async function createLocation(formData: FormData) {
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

  const response = await fetch(`${API_URL}/locations`, {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeaders()),
    },
  });

  if (response.status === 201) {
    revalidateTag("dashboard:locations", "max");
  }
}