import { Provider, Product } from "@/entities";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import ProviderCard from "../_components/ProviderCard";
import ProductCard from "../_components/ProductCard";

export default async function ProviderPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const provider: Provider = await (
        await fetch(`${API_URL}/providers/${id}`, {
            headers: {
                ...(await AuthHeaders()),
            },
        })
    ).json();
    return (
        <div className="flex flex-grow-0 flex-col pl-10 gap-10 h-[90vh] pt-10">
            <ProviderCard provider={provider} />
            <div className="h-1 bg-orange-900 w-[85vw]" />
            <div className="flex flex-wrap gap-10">
                {provider.products.map((product: Product) => (
                    <Link
                        href={{ pathname: `/dashboard/products/${product.productId}` }}
                        key={product.productId}
                        className="hover:scale-110 transition-all"
                    >
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
}