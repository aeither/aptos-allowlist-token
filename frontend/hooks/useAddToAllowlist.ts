import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToAllowlist, AddToAllowlistArguments } from "@/entry-functions/add_allowlist";

export function useAddToAllowlist() {
  const { signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: AddToAllowlistArguments) => {
      const transaction = addToAllowlist(args);
      const result = await signAndSubmitTransaction(transaction);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowlist"] });
    },
  });
}
