import { cardClass, listClass } from "@/app/types";
import { contract } from "@/providers/WalletProvider";
import { useContractRead } from "wagmi";

export const Properties = () => {
  const { data: properties } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  return (
    <div className={listClass}>
      {properties?.map((property) => {
        return (
          <div className={cardClass}>
            <p>Property Address: {property.propertyAddress}</p>
            <p>Property Owner Name: {property.ownerName}</p>
            <p>Property Type: {property.propertyType}</p>
          </div>
        );
      })}
    </div>
  );
};
