import { contract } from "@/providers/WalletProvider";
import { DialogContent, DialogTitle } from "@mui/material";
import { Address, useAccount, useContractWrite } from "wagmi";
import { useUserContext } from "@/providers/UserContextProvider";
import { useEffect } from "react";
import { useContractContext } from "@/providers/ContractContextProvider";

export const StartLease = () => {
  const { propertyIndex, openStartLeaseForm } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const { address } = useAccount();

  const {
    write: startLease,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "startLease",
  });

  useEffect(() => {
    setResultFunction(data);
  }, [data]);

  useEffect(() => {
    setErrorFunction(error);
  }, [error]);

  useEffect(() => {
    setLoadingFunction(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setIsErrorFunction(isError);
  }, [isError]);

  return (
    <>
      <DialogTitle>Start Lease</DialogTitle>
      <DialogContent>
        <form
          className="grid gap-y-5 text-black"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const tenantAddress = openStartLeaseForm.fromTenant
              ? address!
              : (formData.get("tenantAddress") as Address);
            const tenantName = formData.get("tenantName") as string;
            const duration = formData.get("duration") as unknown as bigint;
            startLease({
              args: [propertyIndex!, tenantAddress, tenantName, duration],
            });
          }}
        >
          <input
            name="tenantAddress"
            placeholder="Tenant Address"
            disabled={openStartLeaseForm.fromTenant}
            value={openStartLeaseForm.fromTenant ? address : undefined}
          />
          <input name="tenantName" placeholder="Tenant Name" />
          <input
            className="border border-slate-600"
            placeholder="Duration"
            type="number"
            step={1}
            min={1}
            name="duration"
          />
          <button className="bg-white" disabled={isLoading} type="submit">
            Start
          </button>
        </form>
      </DialogContent>
    </>
  );
};
