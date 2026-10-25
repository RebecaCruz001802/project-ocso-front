import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { cookies } from "next/headers";
import { createLocation } from "@/actions/locations/create";
import { API_URL, TOKEN_NAME } from "../../../constants";
import { Manager, Location } from "../../../entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import SelectManager from "./SelectManagers";

export default async function FormNewLocation({ store }: { store: string | string[] | undefined }) {
  if (store) return null;
  const responseManagers = await fetch(`${API_URL}/managers`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:managers"],
    },
  });
  const dataManagers: Manager[] = await responseManagers.json();
  const responseLocations = await fetch(`${API_URL}/locations`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:locations"],
    },
  });
  const dataLocations: Location[] = await responseLocations.json();

  return (
    <form action={createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rouneded-1g">
    <h1 className="text-3x1 text-white text-center">Crear Tienda</h1>
    <Input label="Nombre" placeholder="Ocso Jurikiya" name="locationName" />
    <Input label="Dirección" placeholder="Av De La Luz S/N" name="locationAddress" />
    <Input label="Latitud" placeholder="-120" name="locationLat"  />
    <Input label="Longitud" placeholder="20" name="locationLng"  />
      <SelectManager managers={dataManagers} locations={dataLocations} />
      <Button type="submit" color="primary"> Subir </Button>
    </form>
  );
}