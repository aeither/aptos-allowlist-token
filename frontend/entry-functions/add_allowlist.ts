import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type AddToAllowlistArguments = {
  address: string;
};

export const addToAllowlist = (args: AddToAllowlistArguments): InputTransactionData => {
  const { address } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::launchpad::add_allowlist`,
      typeArguments: [],
      functionArguments: [address],
    },
  };
};
