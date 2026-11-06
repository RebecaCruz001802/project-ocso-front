import { Provider } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card>
      <CardHeader>{provider.providerName}</CardHeader>
      <Divider />
      <CardBody>
        <p>Correo electrónico:</p>
        <b>{provider.providerEmail}</b>
        <p>Numero de teléfono:</p>
        <b>{provider.providerPhoneNumber}</b>
        {provider.products.length !== 0 ? (
          <p>
            Tiene <b>{provider.products.length}</b> producto {provider.products.length > 1 ? "s" : ""}
          </p>
        ) : (
          <p>No tiene productos</p>
        )}
      </CardBody>
    </Card>
  );
}