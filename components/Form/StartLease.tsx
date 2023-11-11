import { contract } from "@/providers/WalletProvider";
import {
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { Address, useAccount, useContractWrite } from "wagmi";
import { useUserContext } from "@/providers/UserContextProvider";
import { useEffect } from "react";
import { useContractContext } from "@/providers/ContractContextProvider";
import {
  dialogContentClass,
  ellipsisClass,
  formClass,
  inputClass,
} from "@/app/classes";

export const StartLease = () => {
  const { selectedProperty, openStartLeaseForm } = useUserContext();

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
    if (!data) return;
    setResultFunction(data);
  }, [data]);

  useEffect(() => {
    if (!error) return;
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
      <DialogTitle className="border-b-2">Start Lease</DialogTitle>
      <DialogContent className={dialogContentClass}>
        <form
          className={formClass}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const tenantAddress = openStartLeaseForm.fromTenant
              ? address!
              : (formData.get("tenantAddress") as Address);
            const tenantName = formData.get("tenantName") as string;
            const duration = formData.get("duration") as unknown as bigint;
            startLease({
              args: [
                selectedProperty?.propertyIndex!,
                tenantAddress,
                tenantName,
                duration,
              ],
            });
          }}
        >
          <p>Property Index: {Number(selectedProperty?.propertyIndex!)}</p>

          <Tooltip title={selectedProperty?.owner}>
            <p className={ellipsisClass}>
              {selectedProperty?.owner === address ? (
                <>
                  <span className="text-yellow-600">
                    {`Owner Address (you): `}
                  </span>
                </>
              ) : (
                <span>{`Owner Address: `}</span>
              )}
              <span>{selectedProperty?.owner}</span>
            </p>
          </Tooltip>

          {!openStartLeaseForm.fromTenant ? (
            <TextField
              name="tenantAddress"
              label="Tenant Address"
              variant="outlined"
            />
          ) : (
            <Tooltip title={address}>
              <p className={ellipsisClass}>
                <span className="text-yellow-600">
                  {`Tenant Address (you): `}
                </span>
                <span>{address}</span>
              </p>
            </Tooltip>
          )}

          <TextField name="tenantName" label="Tenant Name" variant="outlined" />

          <input
            className={inputClass}
            placeholder="Duration"
            type="number"
            step={1}
            min={1}
            name="duration"
          />

          <Button
            variant="contained"
            size="small"
            color="success"
            disabled={isLoading}
            type="submit"
          >
            Start
          </Button>
        </form>
      </DialogContent>
    </>
  );
};
