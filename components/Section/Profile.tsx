"use client";

import {
  buttonGroupClass,
  cardClass,
  ellipsisClass,
  listClass,
  propertyTypeClass,
} from "@/app/classes";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { House, Storefront } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { zeroAddress } from "viem";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ListingStatusButtons } from "../ListingStatusButtons";
import { PropertyInfo, PropertyType, Status } from "@/app/types";

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
    setOpenLeaseInfo,
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
            (c) => c.whoAbout === property.owner && c.status === Status.confirm
          );
          return (
            <div className={cardClass} key={property.propertyIndex}>
              <div className={propertyTypeClass}>
                {property.propertyType === PropertyType.House ? (
                  <House />
                ) : (
                  <Storefront />
                )}
                {property.owner === address ? "Owner" : "Tenant"}
                {!property.isListed && (
                  <span className="text-yellow-800">(unlisted)</span>
                )}
              </div>

              <div className="overflow-hidden">
                <p>Index: {Number(property.propertyIndex)}</p>

                <Tooltip title={property.propertyAddress}>
                  <p className={ellipsisClass}>
                    Property Address: {property.propertyAddress}
                  </p>
                </Tooltip>

                <Tooltip title={property.ownerName}>
                  <p className={ellipsisClass}>
                    Owner Name: {property.ownerName}
                  </p>
                </Tooltip>

                <Tooltip title={property.owner}>
                  <p className={ellipsisClass}>
                    Owner Address: {property.owner}
                  </p>
                </Tooltip>

                {isBanned && <span className="text-red-800">(banned)</span>}

                {!property.leaseInfo.isActive &&
                  property.leaseInfo.initiatorAddress !== zeroAddress &&
                  property.leaseInfo.initiatorAddress !== address && (
                    <Tooltip title={property.leaseInfo.initiatorAddress}>
                      <p className={ellipsisClass + " text-yellow-800"}>
                        Initiator Address: {property.leaseInfo.initiatorAddress}
                      </p>
                    </Tooltip>
                  )}
              </div>

              <div className={buttonGroupClass}>
                {property.leaseInfo.isActive && (
                  <Button
                    onClick={() => {
                      setSelectedProperty(property);
                      setOpenLeaseInfo(true);
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
                        setSelectedProperty(property);
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

                <ListingStatusButtons
                  property={property}
                  isBanned={isBanned!}
                />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};
