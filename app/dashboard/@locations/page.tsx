import { cookies } from "next/headers";
import { Location } from "../../../entities";
import SelectLocation from "../_components/SelectLocation";
import LocationCard from "../_components/LocationCard";
import FormNewLocation from "../_components/FormNewLocation";
import { API_URL } from "@/constants";
import DeleteLocationButton from "../_components/DeleteLocationButton";
import UpdateLocation from "../_components/UpdateLocation";
import FormUpdateLocation from "../_components/FormUpdateLocation";
import { AuthHeaders } from "@/helpers/authHeaders";

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { store } = await searchParams;
  const response = await fetch(
    `${API_URL}/locations`,
    {
      headers: {
        ...(await AuthHeaders())
      },
      next: {
        tags: ["dashboard:locations"]
      }
    }
  );
  let data: Location[] = await response.json()
  data = [
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
           <SelectLocation locations={data} store={store} />
        </div>
        <div className="w-8/12">
          <LocationCard store={store} />
        </div>
        <div className="w-6/12">
        <FormNewLocation store={store}/>
        </div>
        <DeleteLocationButton store={store}/>
        {store && (
          <UpdateLocation>
            <FormUpdateLocation store={store}/>
          </UpdateLocation>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;