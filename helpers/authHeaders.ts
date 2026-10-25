import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const AuthHeaders = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  return {
    Authorization: `Bearer ${token}`,
  };
});