import axios from "axios";
import { cookies } from "next/headers";
import { Location } from "../../../entities";
import SelectLocation from "../_components/SelectLocation";

const TOKEN_NAME = "token";

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { store } = await searchParams;

  const userCookies = await cookies();
  const token = userCookies.get(TOKEN_NAME)?.value;

  const { data } = await axios.get<Location[]>(
    "http://127.0.0.1:4000/locations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const locations: Location[] = [
    {
      locationId: 0,
      locationName: "Ninguna",
      locationLatLng: [0, 0],
      locationAddress: "No existe",
    },
    ...data,
  ];

  return (
    <div className="w-7/12">
      <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
        <div className="w-1/2 my-10">
         <SelectLocation locations={locations} store={store} />
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;