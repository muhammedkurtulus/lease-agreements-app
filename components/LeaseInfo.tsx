import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useUserContext } from "@/providers/UserContextProvider";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useAccount, useContractWrite } from "wagmi";
import { contract } from "@/providers/WalletProvider";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { PropertyType } from "@/app/types";
import { buttonGroupClass, cardClass } from "@/app/classes";

export const LeaseInfo = () => {
  const [isOwnerOrTenant, setIsOwnerOrTenant] = useState(false);

  const { selectedProperty, setOpenComplaintForm, setOpenRequestTermination } =
    useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const { address } = useAccount();

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

  useEffect(() => {
    if (!address || !selectedProperty) return;

    setIsOwnerOrTenant(
      selectedProperty?.leaseInfo.tenantAddress === address ||
        selectedProperty?.owner === address
    );
  }, [address, selectedProperty]);

  return (
    <>
      <DialogTitle>Lease</DialogTitle>
      <DialogContent className="grid gap-3">
        <div>
          <p>Owner Name: {selectedProperty?.ownerName}</p>
          <p>Owner Address: {selectedProperty?.owner}</p>
          <p>Tenant Name: {selectedProperty?.leaseInfo.tenantName}</p>
          <p>Tenant Address: {selectedProperty?.leaseInfo.tenantAddress}</p>
          <p>Property Address: {selectedProperty?.propertyAddress}</p>
          <p>Duration: {Number(selectedProperty?.leaseInfo.duration)}</p>
          <p>Start Date: {Number(selectedProperty?.leaseInfo.startDate)}</p>
          <p>End Date: {Number(selectedProperty?.leaseInfo.endDate)}</p>
          <p>Property Index: {Number(selectedProperty?.propertyIndex)}</p>
          <p>
            Property Type:
            {selectedProperty?.propertyType === PropertyType.House
              ? " House"
              : " Store"}
          </p>
        </div>

        {selectedProperty?.leaseInfo.terminationRequester !== zeroAddress &&
          isOwnerOrTenant && (
            <p className="text-yellow">
              Termination Reason:{" "}
              {selectedProperty?.leaseInfo.terminationReason}
            </p>
          )}

        <div className={buttonGroupClass}>
          {selectedProperty?.leaseInfo.isActive && isOwnerOrTenant && (
            <Button
              onClick={() => {
                setOpenComplaintForm(true);
              }}
              variant="contained"
              size="small"
              color="warning"
            >
              Complain
            </Button>
          )}

          {selectedProperty?.leaseInfo.terminationRequester === zeroAddress &&
            isOwnerOrTenant && (
              <Button
                onClick={() => {
                  setOpenRequestTermination(true);
                }}
                variant="contained"
                size="small"
                color="error"
              >
                Terminate
              </Button>
            )}

          {selectedProperty?.leaseInfo.terminationRequester !== zeroAddress &&
            selectedProperty?.leaseInfo.terminationRequester !== address &&
            isOwnerOrTenant && (
              <Button
                onClick={() => {
                  confirmTermination({
                    args: [selectedProperty?.propertyIndex!],
                  });
                }}
                variant="contained"
                size="small"
                color="error"
              >
                Confirm Termination
              </Button>
            )}
        </div>
      </DialogContent>
    </>
  );
};
