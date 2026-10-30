import { Manager } from "@/entities";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import SelectStore from "./SelectStore";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import updateManager from "@/actions/managers/update";

export default async function FormUpdateManager({ manager }: { manager: Manager }) {
  const updateManagerWithId = updateManager.bind(null, manager.managerId);
  const responseStores = await fetch(`${API_URL}/locations`, {
    headers: {
      ...(await AuthHeaders())
    }
  })
  const stores = await responseStores.json()
  return (
    <form action={updateManagerWithId} className="bg-orange-400 rounded-md">
      <h1> Actualizar Manager </h1>
      <Input
        defaultValue={manager.managerFullName}
        placeholder="Marco Aurelio"
        name="managerFullName"
      />
      <Input
        defaultValue={manager.managerEmail}
        placeholder="manager@ocso.com"
        name="managerEmail"
      />
      <Input
        defaultValue={String(manager.managerSalary)}
        placeholder="12000"
        name="managerSalary"
      />
      <Input
        defaultValue={manager.managerPhoneNumber}
        placeholder="4421333617"
        name="managerPhoneNumber"
      />
      <SelectStore
        stores={stores}
        defaultStore={manager?.location?.locationId}
      />
      <Button color="primary" type="submit">
        Actualizar
      </Button>
    </form>
  );
}