import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useUserContext } from "@/providers/UserContextProvider";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useContractWrite } from "wagmi";
import { contract } from "@/providers/WalletProvider";
import { useEffect } from "react";
import { zeroAddress } from "viem";
import { PropertyType } from "@/app/types";

export const LeaseInfo = () => {
  const {
    selectedProperty,
    setOpenComplaintForm,
    setPropertyIndex,
    setOpenRequestTermination,
    propertyIndex,
  } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: confirmTermination,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "confirmTermination",
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
      <DialogTitle>Lease</DialogTitle>
      <DialogContent>
        <p>Owner Name: {selectedProperty?.ownerName}</p>
        <p>Owner Address: {selectedProperty?.owner}</p>
        <p>Tenant Name: {selectedProperty?.leaseInfo.tenantName}</p>
        <p>Tenant Address: {selectedProperty?.leaseInfo.tenantAddress}</p>
        <p>Property Address: {selectedProperty?.propertyAddress}</p>
        <p>Duration: {Number(selectedProperty?.leaseInfo.duration)}</p>
        <p>Start Date: {Number(selectedProperty?.leaseInfo.startDate)}</p>
        <p>End Date: {Number(selectedProperty?.leaseInfo.endDate)}</p>
        <p>Index: {Number(selectedProperty?.propertyIndex)}</p>
        <p>
          Property Type:
          {selectedProperty?.propertyType === PropertyType.House
            ? "House"
            : "Store"}
        </p>

        {selectedProperty?.leaseInfo.isActive && (
          <Button
            onClick={() => {
              setPropertyIndex(selectedProperty?.propertyIndex);
              setOpenComplaintForm(true);
            }}
            variant="contained"
            size="small"
            color="warning"
          >
            Complain
          </Button>
        )}

        {selectedProperty?.leaseInfo.terminationRequester === zeroAddress ? (
          <Button
            onClick={() => {
              setPropertyIndex(selectedProperty?.propertyIndex);
              setOpenRequestTermination(true);
            }}
            variant="contained"
            size="small"
            color="error"
          >
            Terminate
          </Button>
        ) : (
          <Button
            onClick={() => {
              confirmTermination({
                args: [propertyIndex!],
              });
            }}
            variant="contained"
            size="small"
            color="error"
          >
            Confirm Termination
          </Button>
        )}
        {/* TODO: Termination reason */}
      </DialogContent>
    </>
  );
};
