import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { Product, Provider } from "@/entities";
import FilteredCards from "./_components/FilteredCards";
import { ReactNode } from "react";

const LayoutProducts = async ({children} : {children : ReactNode}) => {
  const responseProducts = await fetch(`${API_URL}/products`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:products"],
    },
  });
  const products: Product[] = await responseProducts.json();
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });
  const providers: Provider[] = await responseProviders.json();
  return (
    <div className="h-[90vh] w-full flex">
      <div className="w-3/12">
        <FilteredCards products={products} providers={providers} />
      </div>
      <div className="w-6/12">
        {children}
      </div>
    </div>
  );
};

export default LayoutProducts;