import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ManagerCard from "./_components/ManagerCard";

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
    <div className="w-5/12">
  <ManagerCard manager={data} />
  
</div>
  );
}