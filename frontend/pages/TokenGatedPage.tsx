import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAssetData } from "@/hooks/useGetAssetData";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

export function TokenGatedPage() {
  const { account } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const { data } = useGetAssetData();
  const { asset, totalAbleToMint = 0, yourBalance = 0 } = data ?? {};

  useEffect(() => {
    if (yourBalance && yourBalance >= 1) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [yourBalance]);

  if (!account) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Please connect your wallet to access this page.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading asset data...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <>
        <LaunchpadHeader title="Exclusive Content" />
        <div className="container mx-auto p-4 text-center min-h-4/5 flex items-center justify-center flex-col">
          <div className="p-10 shadow-lg rounded-lg mt-10">
            <p className="text-xl">You need at least 1 token to access this page.</p>
            <p className="mt-2">
              Your current balance: {yourBalance} {asset?.symbol}
            </p>
            <p className="mt-4 text-3xl">😢</p>
            <Button onClick={() => (window.location.href = "/")} className="mt-4">
              Go Back to Home
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LaunchpadHeader title="Exclusive Content" />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the exclusive area! 😎🏖️</h2>
        <Table>
          <TableCaption>Asset Information</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Asset Name</TableCell>
              <TableCell>{asset?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Asset Symbol</TableCell>
              <TableCell>{asset?.symbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Your Balance</TableCell>
              <TableCell>{yourBalance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Able to Mint</TableCell>
              <TableCell>{totalAbleToMint}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
