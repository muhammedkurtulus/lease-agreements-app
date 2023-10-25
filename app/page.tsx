"use client";

import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { BaseError } from "viem";
import { useAccount } from "wagmi";
import { Lease__factory } from "@/typechain-types";
import { Address } from "viem";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";

const contract = {
  address: process.env.NEXT_PUBLIC_LEASE_CONTRACT as Address,
  abi: Lease__factory.abi,
} as const;

export enum PropertyType {
  House,
  Shop,
}

export default function Home() {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  const {
    data: properties,
    isRefetching: loadingProperties,
    refetch: getAllProperties,
  } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const {
    write: addProperty,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "addProperty",
  });

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    console.log("properties", properties);
  }, [properties]);

  const renderPropertyForm = () => {
    return (
      <form
        className="grid gap-y-5 text-black"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const propertyAddress = formData.get("propertyAddress") as string;
          const propertyOwnerName = formData.get("propertyOwnerName") as string;
          const propertyType = formData.get("propertyType") as unknown as PropertyType;
          addProperty({ args: [propertyAddress, propertyType, propertyOwnerName] });
        }}
      >
        <input name="propertyAddress" placeholder="Property Address" />
        <input name="propertyOwnerName" placeholder="Property Owner Name" />
        <select name="propertyType">
          <option value={PropertyType.House}>House</option>
          <option value={PropertyType.Shop}>Shop</option>
        </select>
        <button className="bg-white" disabled={isLoading} type="submit">
          Add
        </button>
      </form>
    );
  };

  const renderPropertyList = () => {
    return (
      <div className="grid w-96 gap-y-5">
        {properties?.map((property) => {
          return (
            <div
              className="grid justify-start text-white gap-y-1 text-black"
              key={property.propertyAddress}
            >
              <div>Property Address: {property.propertyAddress}</div>
              <div>Property Owner Name: {property.ownerName}</div>
              <div>Property Type: {property.propertyType}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTransaction = () => {
    return (
      <>
        {isLoading && <div>Check wallet...</div>}
        {isPending && <div>Transaction pending...</div>}
        {isSuccess && <div>Transaction Hash: {data?.hash}</div>}
        {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      </>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-20">
      <ConnectKitButton />
      {renderPropertyForm()}
      {renderPropertyList()}
      {renderTransaction()}
    </main>
  );
}
