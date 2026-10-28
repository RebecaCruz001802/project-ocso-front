import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default async function ManagerPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/managers/${id}`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: [`dashboard:managers:${id}`, 'dashboard:managers']
    }
  });

  const data: Manager = await response.json();
  return (
    <Card className="mx-20 p-2 bg-orange-50">
      <CardHeader>
        <p className="w-full">
          Nombre: <b>{data.managerFullName}</b>
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">
          Email: <b>{data.managerEmail}</b>
        </p>
        <p className="w-full">
          Teléfono: <b>{data.managerPhoneNumber}</b>
        </p>
        {data.location ? (
          <>
            <p>
              Tienda: <b>{data.location.locationName}</b>
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29869.686496243543!2d-100.46746048528593!3d20.640641078909937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d350f1bfaa09a9%3A0x2553825c3fed42a0!2sOXXO%20La%20Loma%20QRF!5e0!3m2!1ses-419!2smx!4v1792858021945!5m2!1ses-419!2smx"
              className="mx-auto mt-2 block h-[150px] w-[220px] rounded-md border-2 border-red-800"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </>
        ) : (
          <p> No tiene tienda</p>
        )}
      </CardBody>
    </Card>
  );
}