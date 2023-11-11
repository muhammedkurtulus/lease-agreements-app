import { Button, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { useUserContext } from "@/providers/UserContextProvider";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useAccount, useContractWrite } from "wagmi";
import { contract } from "@/providers/WalletProvider";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { PropertyType } from "@/app/types";
import {
  buttonGroupClass,
  cardClass,
  dialogContentClass,
  ellipsisClass,
} from "@/app/classes";

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

  const formatUnixTime = (unixTimestamp: bigint | undefined): string => {
    if (unixTimestamp === undefined) {
      return "";
    }

    return new Date(Number(unixTimestamp) * 1000).toLocaleString();
  };

  return (
    <>
      <DialogTitle className="border-b-2">Lease Info</DialogTitle>
      <DialogContent className={dialogContentClass}>
        <div className="overflow-hidden">
          <Tooltip title={selectedProperty?.ownerName}>
            <p className={ellipsisClass}>
              Owner Name: {selectedProperty?.ownerName}
            </p>
          </Tooltip>

          <Tooltip title={selectedProperty?.owner}>
            <p className={ellipsisClass}>
              Owner Address: {selectedProperty?.owner}
            </p>
          </Tooltip>

          <Tooltip title={selectedProperty?.leaseInfo.tenantName}>
            <p className={ellipsisClass}>
              Tenant Name: {selectedProperty?.leaseInfo.tenantName}
            </p>
          </Tooltip>

          <Tooltip title={selectedProperty?.leaseInfo.tenantAddress}>
            <p className={ellipsisClass}>
              Tenant Address: {selectedProperty?.leaseInfo.tenantAddress}
            </p>
          </Tooltip>

          <Tooltip title={selectedProperty?.propertyAddress}>
            <p className={ellipsisClass}>
              Property Address: {selectedProperty?.propertyAddress}
            </p>
          </Tooltip>

          <p>Property Index: {Number(selectedProperty?.propertyIndex)}</p>

          <p>
            Property Type:
            {selectedProperty?.propertyType === PropertyType.House
              ? " House"
              : " Store"}
          </p>

          <p>Duration: {Number(selectedProperty?.leaseInfo.duration)} year</p>

          <Tooltip
            title={`${formatUnixTime(
              selectedProperty?.leaseInfo.startDate
            )} (UTC)`}
          >
            <p className={ellipsisClass}>
              {`Start Date: ${formatUnixTime(
                selectedProperty?.leaseInfo.startDate
              )} (UTC)`}
            </p>
          </Tooltip>

          <Tooltip
            title={`${formatUnixTime(
              selectedProperty?.leaseInfo.endDate
            )} (UTC)`}
          >
            <p className={ellipsisClass}>{`End Date: ${formatUnixTime(
              selectedProperty?.leaseInfo.endDate
            )} (UTC)`}</p>
          </Tooltip>
        </div>

        {selectedProperty?.leaseInfo.terminationRequester !== zeroAddress &&
          isOwnerOrTenant && (
            <Tooltip title={selectedProperty?.leaseInfo.terminationReason}>
              <p className={ellipsisClass + " text-yellow"}>
                Termination Reason:
                {selectedProperty?.leaseInfo.terminationReason}
              </p>
            </Tooltip>
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
