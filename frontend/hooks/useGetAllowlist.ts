import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

export function useGetAllowlist() {
  const { account } = useWallet();

  return useQuery({
    queryKey: ["allowlist"],
    enabled: !!account,
    queryFn: async () => {
      const result = await aptosClient().view({
        payload: {
          function: `${MODULE_ADDRESS}::launchpad::get_allowlist`,
          typeArguments: [],
          functionArguments: [],
        },
      });
      return result[0] as string[];
    },
  });
}
