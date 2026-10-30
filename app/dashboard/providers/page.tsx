import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { LuPlus } from "react-icons/lu";
import ProviderCard from "./_components/ProviderCard";

const ProviderPage = async () => {
  const response = await fetch(`${API_URL}/providers`, {
    headers: {
      ...(await AuthHeaders()),
    },
  });

  const providers: Provider[] = await response.json();

  return (
    <div className="flex flex-grow-0 flex-col items-end w-full px-10 pt-10 h-[90vh]">
      <Button className="w-fit" color="primary">
        <LuPlus size="20" />
      </Button>
      <div className="flex flex-wrap w-full py-20 flex-grow-0 gap-14">
        {providers.map((provider: Provider) => (
          <Link
            className="hover:scale-110 transition-transform"
            href={{ pathname: `/dashboard/providers/${provider.providerId}` }}
            key={provider.providerId}
          >
            <ProviderCard provider={provider} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProviderPage;