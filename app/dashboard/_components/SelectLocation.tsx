'use client';
import { Location } from "../../../entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SelectLocation({
  locations,
  store,
}: {
  locations: Location[];
  store?: string | string[] | undefined;
}) {
  
  
  const router = useRouter();

 
  const selected = typeof store === "string" ? [store] : [];

  return (
    <Select
      placeholder="Selecciona una tienda"
      label="Tienda"
      classNames={{
        mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all",
      }}
      selectedKeys={selected}
      onChange={(e) => {
        if (e.target.value === "") return;

  if (e.target.value === "0") {
    router.push("/dashboard");
    return;
  }
        router.push(`/dashboard?store=${e.target.value}`);
      }}
    >
      {locations.map((location) => (
        <SelectItem key={location.locationId}>
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}