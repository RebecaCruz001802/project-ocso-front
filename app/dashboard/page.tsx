import EmployeesLocation from "./_components/EmployeesLocation";

const EmployeesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { store } = await searchParams;
console.log("store:", store);
  return (
    <div className="w-4/12">
      {typeof store === "string" ? (
        <EmployeesLocation store={store} />
      ) : (
        <p className="text-2xl px-10 my-10">
          Selecciona una tienda para ver los empleados
        </p>
      )}
    </div>
  );
};

export default EmployeesPage;