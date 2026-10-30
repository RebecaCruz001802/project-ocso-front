import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import ManagerCard from "./_components/ManagerCard";
import DeleteManagerButton from "./_components/DeleteLocationButton";
import UpdateManager from "./_components/UpdateManager";
import FormUpdateManager from "./_components/FormUpdateManager";

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
    <div className="flex flex-col gap-10 flex-grow-0 items-center justify-center">
      <ManagerCard manager={data} />
      <div className="bg-white shadow-medium rounded-md px-10 py-2">
        <UpdateManager>
          <FormUpdateManager manager={data} />
        </UpdateManager>
        <DeleteManagerButton managerId={data.managerId} />
      </div>
    </div>
  );
}