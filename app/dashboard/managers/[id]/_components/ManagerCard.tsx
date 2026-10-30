"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Manager } from "@/entities"
import Link from "next/link";

export default function ManagerCard({ manager }: { manager: Manager }) {
   return (
    <Card className="mx-10 py-2 text-center">
      <CardHeader>
  <p className="w-full">
    <b className="text-4xl">{manager.managerFullName}</b>
  </p>
</CardHeader>
      <Divider />
    <CardBody className="flex flex-row flex-grow-0 items-center gap-6">
  <div className="flex flex-col w-full">
       <p className="w-full break-all">
  Email: <b>{manager.managerEmail}</b>
</p>
        <p className="w-full">
          Teléfono: <b>{manager.managerPhoneNumber}</b>
        </p>
        <p className="w-full">
  Salario: <b>{manager.managerSalary}</b>
</p>
     <p className={manager.location ? "" : "hidden"}>
  Tienda:{" "}
  <Link
    href={{
      pathname: "/dashboard/",
      query: {
        store: manager?.location?.locationId,
      },
    }}
  >
    <b className="underline">{manager?.location?.locationName}</b>
  </Link>
</p>
        </div>
        {manager.location ? (
          <>
            
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