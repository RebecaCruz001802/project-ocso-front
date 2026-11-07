"use client";

import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import createProvider from "@/actions/providers/create";
import { CloseModalContext } from "./CreateProvider";

export default function FormNewProvider() {
  const onClose = useContext(CloseModalContext);

  async function handleAction(formData: FormData) {
    await createProvider(formData);
    onClose();
  }

  return (
    <form action={handleAction} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
      <h1 className="text-3xl text-white text-center">Crear Proveedor</h1>
      <Input required={true} label="Nombre" placeholder="Pepsico" name="providerName" />
      <Input required={true} label="Correo electrónico" placeholder="pepsico@business.com" name="providerEmail" />
      <Input required={true} label="Teléfono" placeholder="4421333617" name="providerPhoneNumber" />
      <Button type="submit" color="primary"> Craer Proveedor </Button>
    </form>
  );
}