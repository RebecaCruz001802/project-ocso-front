
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { cookies } from "next/headers";
import { createLocation } from "@/actions/locations/create";
import { API_URL, TOKEN_NAME } from "../../../constants";
import SelectManager from "./SelectManagers";

export default async function FormNewLocation() {
  const token = (await cookies()).get(TOKEN_NAME)?.value;
  const responseManagers = await axios.get(`${API_URL}/managers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const responseLocation = await axios.get(`${API_URL}/locations`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return (
    <form action={createLocation}>
    <Input label="Nombre" placeholder="Ocso Jurikiya" name="locationName" />
<Input label="Dirección" placeholder="Av De La Luz S/N" name="locationAddress" />
<Input label="Latitud" placeholder="-120" name="locationLat"  />
<Input label="Longitud" placeholder="20" name="locationLng"  />
      <SelectManager managers={responseManagers.data} locations={responseLocation.data} />
      <Button type="submit"> Subir </Button>
    </form>
  );
}