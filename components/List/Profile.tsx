"use client";

import { PropertyInfo, PropertyType, cardClass, listClass } from "@/app/types";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { House, Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { zeroAddress } from "viem";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

export const Profile = () => {
  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    ownProperties,
    leasedProperties,
    setOpenComplaintForm,
    setOpenStartLeaseForm,
    setSelectedProperty,
    setOwnProperties,
    setLeasedProperties,
    setPropertyIndex,
  } = useUserContext();

  const { address } = useAccount();

  const { data: properties } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const {
    write: signLease,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "signLease",
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

  useEffect(() => {
    console.log("properties", properties);

    const ownProperties = properties?.filter(
      (property) => property.owner === address
    );
    const leasedProperties = properties?.filter(
      (property) => property.leaseInfo.tenantAddress === address
    );

    setOwnProperties(ownProperties);
    setLeasedProperties(leasedProperties);
  }, [properties, address]);

  return (
    <div className={listClass}>
      {ownProperties?.map((property: PropertyInfo) => {
        return (
          <div className={cardClass}>
            <div className="flex">
              {property.propertyType === PropertyType.House ? (
                <House />
              ) : (
                <Storefront />
              )}
              Owner
            </div>

            <p>Property Address: {property.propertyAddress}</p>
            <p>Owner Name: {property.ownerName}</p>
            <p>Index: {Number(property.propertyIndex)}</p>

            <div className="flex justify-between">
              {property.leaseInfo.isActive && (
                <Button
                  onClick={() => {
                    setSelectedProperty(property);
                  }}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  View Lease
                </Button>
              )}

              {!property.leaseInfo.isActive && (
                <Button
                  onClick={() => {
                    setPropertyIndex(property.propertyIndex);
                    setOpenStartLeaseForm(true);
                  }}
                  variant="contained"
                  size="small"
                  disabled={property.leaseInfo.tenantAddress !== zeroAddress}
                >
                  Start Lease
                </Button>
              )}
            </div>
          </div>
        );
      })}

      {leasedProperties?.map((property: PropertyInfo) => {
        return (
          <div className="border-2 rounded-xl p-3 border-green-800">
            <div className="flex">
              {property.propertyType === PropertyType.House ? (
                <House />
              ) : (
                <Storefront />
              )}
              Tenant
            </div>
            <p>Property Address: {property.propertyAddress}</p>
            <p>Owner Name: {property.ownerName}</p>
            <p>Index: {Number(property.propertyIndex)}</p>
            <div className="flex justify-between">
              {property.leaseInfo.isActive ? (
                <Button
                  onClick={() => {
                    setPropertyIndex(property.propertyIndex);
                    setOpenComplaintForm(true);
                  }}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  Complain
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    signLease({
                      args: [property.propertyIndex],
                    });
                  }}
                  variant="contained"
                  size="small"
                  color="warning"
                >
                  Sign
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
