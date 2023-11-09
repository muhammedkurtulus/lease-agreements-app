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
import { ListingStatusButtons } from "../ListingStatusButtons";

export const Profile = () => {
  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    relatedProperties,
    setOpenStartLeaseForm,
    setSelectedProperty,
    setRelatedProperties,
    setPropertyIndex,
  } = useUserContext();

  const { address } = useAccount();

  const { data: properties } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const { data: complaints } = useContractRead({
    ...contract,
    functionName: "getAllComplaints",
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

    const _properties = properties?.filter(
      (property) =>
        property.owner === address ||
        property.leaseInfo.tenantAddress === address
    );

    setRelatedProperties(_properties);
  }, [properties, address]);

  return (
    relatedProperties &&
    relatedProperties.length > 0 && (
      <div className={listClass}>
        {relatedProperties.map((property: PropertyInfo) => {
          const isBanned = complaints?.some(
            (c) => c.whoAbout === property.owner && c.confirmed
          );
          return (
            <div className={cardClass}>
              <div className="flex">
                {property.propertyType === PropertyType.House ? (
                  <House />
                ) : (
                  <Storefront />
                )}
                {property.owner === address ? "Owner" : "Tenant"}
                {!property.isListed && (
                  <span className="text-yellow-800">(unlisted)</span>
                )}
                {isBanned && <span className="text-red-800">(banned)</span>}
              </div>
              <p>Property Address: {property.propertyAddress}</p>
              <p>Owner Name: {property.ownerName}</p>
              <p>Index: {Number(property.propertyIndex)}</p>

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

              {!property.leaseInfo.isActive &&
                property.leaseInfo.initiatorAddress === zeroAddress && (
                  <Button
                    onClick={() => {
                      setPropertyIndex(property.propertyIndex);
                      setOpenStartLeaseForm({
                        opened: true,
                        fromTenant: property.owner === address ? false : true,
                      });
                    }}
                    variant="contained"
                    size="small"
                    disabled={
                      property.leaseInfo.tenantAddress !== zeroAddress ||
                      !property.isListed ||
                      isBanned
                    }
                  >
                    Start Lease
                  </Button>
                )}

              {!property.leaseInfo.isActive &&
                property.leaseInfo.initiatorAddress !== zeroAddress &&
                property.leaseInfo.initiatorAddress !== address && (
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

              <ListingStatusButtons property={property} isBanned={isBanned!} />
            </div>
          );
        })}
      </div>
    )
  );
};
