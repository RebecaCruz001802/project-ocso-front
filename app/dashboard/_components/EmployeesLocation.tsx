import { Employee } from "../../../entities";
import { API_URL, TOKEN_NAME } from "../../../constants";
import { cookies } from "next/headers";
import EmployeeCard from "./EmployeeCard";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
  if (!store) return "No hay empleados";
  const response = await fetch(`${API_URL}/employees/location/${store}`, {
    method: "GET",
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:locations:employees"],
    },
  });
  const data: Employee[] = await response.json();
  return data?.map((employee: Employee) => (
    <EmployeeCard key={employee.employeeId} employee={employee} />
  ));
}