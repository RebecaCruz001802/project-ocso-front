import axios from "axios";
import { Employee } from "../../../entities";
import { API_URL, TOKEN_NAME } from "../../../constants";
import { cookies } from "next/headers";
import EmployeeCard from "./EmployeeCard";

export default async function EmployeesLocation({ store }: { store: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  const { data } = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data.length === 0) {
    return (
      <p className="text-2xl px-10 my-10">
        Selecciona una tienda para ver los empleados
      </p>
    );
  }

  return data.map((employee) => (
    <EmployeeCard key={employee.employeeId} employee={employee} />
  ));
}