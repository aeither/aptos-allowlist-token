// Internal components
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Internal hooks
import { useAddToAllowlist } from "@/hooks/useAddToAllowlist";
import { useGetAllowlist } from "@/hooks/useGetAllowlist";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export function AllowlistPage() {
  const [newAddress, setNewAddress] = useState("");
  const { account } = useWallet();
  const { mutate: addToAllowlist, isPending: isAdding } = useAddToAllowlist();
  const { data: allowlist, isPending: isLoadingAllowlist } = useGetAllowlist();

  const handleAddAddress = () => {
    if (newAddress && account) {
      addToAllowlist({ address: newAddress });
      setNewAddress("");
    }
  };

  return (
    <>
      <LaunchpadHeader title="Allowlist Management" />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter address to add"
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddAddress}
            disabled={isAdding || !account}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isAdding ? "Adding..." : "Add to Allowlist"}
          </button>
        </div>
        <Table>
          <TableCaption>Current Allowlist</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingAllowlist ? (
              <TableRow>
                <TableCell colSpan={1}>Loading allowlist...</TableCell>
              </TableRow>
            ) : (
              allowlist?.map((address, index) => (
                <TableRow key={index}>
                  <TableCell>{address}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
