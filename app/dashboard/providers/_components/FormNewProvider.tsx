import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import createProvider from "@/actions/providers/create";

export default function FormNewProvider() {
  return (
    <form action={createProvider} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
      <h1 className="text-3xl text-white text-center">Crear Proveedor</h1>
      <Input required={true} label="Nombre" placeholder="Pepsico" name="providerName" />
      <Input required={true} label="Correo electrónico" placeholder="pepsico@business.com" name="providerEmail" />
      <Input required={true} label="Teléfono" placeholder="4421333617" name="providerPhoneNumber" />
      <Button type="submit" color="primary"> Subir </Button>
    </form>
  );
}