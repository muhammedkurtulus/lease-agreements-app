import { PropertyInfo, PropertyType, cardClass, listClass } from "@/app/types";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { House, Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { zeroAddress } from "viem";
import { useAccount, useContractRead } from "wagmi";

export const Properties = () => {
  const { setOpenStartLeaseForm, setPropertyIndex, setSelectedProperty } =
    useUserContext();

  const { data: properties } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const { address } = useAccount();

  return (
    properties &&
    properties.length > 0 && (
      <div className={listClass}>
        {properties.map((property: PropertyInfo) => {
          if (property.isListed) {
            return (
              <div className={cardClass}>
                <div className="flex">
                  {property.propertyType === PropertyType.House ? (
                    <House />
                  ) : (
                    <Storefront />
                  )}
                  {property.owner === address
                    ? "Owner"
                    : property.leaseInfo.tenantAddress === address
                    ? "Tenant"
                    : undefined}
                </div>
                <p>Property Address: {property.propertyAddress}</p>
                <p>Property Owner Name: {property.ownerName}</p>
                <p>Owner Address: {property.owner}</p>
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

                {!property.leaseInfo.isActive && property.owner !== address && (
                  <Button
                    onClick={() => {
                      setPropertyIndex(property.propertyIndex);
                      setOpenStartLeaseForm({
                        opened: true,
                        fromTenant: true,
                      });
                    }}
                    variant="contained"
                    size="small"
                    disabled={property.leaseInfo.tenantAddress !== zeroAddress}
                  >
                    Start Lease
                  </Button>
                )}
              </div>
            );
          }
        })}
      </div>
    )
  );
};
