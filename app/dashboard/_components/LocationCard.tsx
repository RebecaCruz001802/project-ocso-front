import { cookies } from "next/headers";
import axios from "axios";
import Link from "next/link";
import { API_URL, TOKEN_NAME } from "../../../constants";
import { Location } from "../../../entities";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function LocationCard({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (typeof store !== "string") return null;

  
  const { data } = await axios.get<Location>(`${API_URL}/locations/${store}`, {
    headers: {
  ...(await AuthHeaders()),
},
  });

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-3">
        <b className="w-full text-2xl">{data.locationName}</b>
      </div>
      <hr className="border-gray-200" />
      <div className="p-3 flex flex-col w-full items-center">
        <p className="w-full">
          Manager:{" "}
          <Link href={{ pathname: `/dashboard/managers` }}>
            <b>{data.manager?.managerFullName}</b>
          </Link>
        </p>
        <p className="w-full">
          Dirección: <b>{data.locationAddress}</b>
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29869.686496243543!2d-100.46746048528593!3d20.640641078909937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d350f1bfaa09a9%3A0x2553825c3fed42a0!2sOXXO%20La%20Loma%20QRF!5e0!3m2!1ses-419!2smx!4v1792858021945!5m2!1ses-419!2smx"
          className="mx-auto mt-2 block h-[150px] w-[220px] rounded-md border-2 border-red-800"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
}