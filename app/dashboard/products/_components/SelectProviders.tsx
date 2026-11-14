'use client';
import { Provider } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
export default function SelectProvider({providers, defaultProvider}: {providers: Provider[], defaultProvider?: string}) {
    return (
        <Select defaultSelectedKeys={defaultProvider ? [defaultProvider]: undefined} label="Proveedor" name="provider">
            {providers.map((provider) => {
                return (
                    <SelectItem key={provider.providerId} textValue={provider.providerName}>
                        {provider.providerName}
                    </SelectItem>
                );
            })}
        </Select>
    );
}