"use client";

import { Lease__factory } from "@/typechain-types";
import { PropertyInfoStruct } from "@/typechain-types/Lease";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { Address, BaseError } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function Home() {
  const [openPropertyForm, setOpenPropertyForm] = useState(false);
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const [ownProperties, setOwnProperties] = useState<PropertyInfo[]>();
  const [leasedProperties, setLeasedProperties] = useState<PropertyInfo[]>();
  const [propertyIndex, setPropertyIndex] = useState<bigint>();

  const { address } = useAccount();

  const {
    data: properties,
    isRefetching: loadingProperties,
    refetch: getAllProperties,
  } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const {
    data: complaints,
    isRefetching: loadingComplaints,
    refetch: getAllComplaints,
  } = useContractRead({
    ...contract,
    functionName: "getAllComplaints",
  });

  const {
    write: addProperty,
    data: propertyData,
    error: propertyError,
    isLoading: propertyLoading,
    isError: propertyIsError,
  } = useContractWrite({
    ...contract,
    functionName: "addProperty",
  });

  const {
    write: submitComplaint,
    data: complaintData,
    error: complaintError,
    isLoading: complaintLoading,
    isError: complaintIsError,
  } = useContractWrite({
    ...contract,
    functionName: "submitComplaint",
  });

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: propertyData?.hash,
  });

  useEffect(() => {
    getAllProperties();
    getAllComplaints();
  }, [isSuccess]);

  useEffect(() => {
    console.log("complaints", complaints);
  }, [complaints]);

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

  useEffect(() => {
    console.log("ownProperties", ownProperties);
    console.log("leasedProperties", leasedProperties);
  }, [ownProperties]);

  const renderPropertyForm = () => {
    return (
      <>
        <DialogTitle>Add Property</DialogTitle>
        <DialogContent>
          <form
            className="grid gap-y-5 text-black"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const propertyAddress = formData.get("propertyAddress") as string;
              const propertyOwnerName = formData.get(
                "propertyOwnerName"
              ) as string;
              const propertyType = formData.get(
                "propertyType"
              ) as unknown as PropertyType;
              addProperty({
                args: [propertyAddress, propertyType, propertyOwnerName],
              });
            }}
          >
            <input name="propertyAddress" placeholder="Property Address" />
            <input name="propertyOwnerName" placeholder="Property Owner Name" />
            <select name="propertyType">
              <option value={PropertyType.House}>House</option>
              <option value={PropertyType.Shop}>Shop</option>
            </select>
            <button
              className="bg-white"
              disabled={propertyLoading}
              type="submit"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </>
    );
  };

  const renderComplaintForm = () => {
    return (
      <>
        <DialogTitle>Submit Complaint</DialogTitle>
        <DialogContent>
          <form
            className="grid gap-y-5 text-black"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const description = formData.get("description") as string;
              submitComplaint({ args: [propertyIndex!, description] });
            }}
          >
            <input name="description" placeholder="Description" />
            <button
              className="bg-white"
              disabled={propertyLoading}
              type="submit"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </>
    );
  };

  const renderPropertyList = () => {
    return (
      <div className="grid grid-cols-4 gap-4">
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

  const renderComplaintList = () => {
    return (
      <div className="grid grid-cols-4 gap-4">
        {complaints?.map((complaint) => {
          return (
            <div
              className="grid justify-start text-white gap-y-1 text-black"
              key={complaint.whoAbout}
            >
              <div>Complainant Address: {complaint.complainant}</div>
              <div>Who About: {complaint.whoAbout}</div>
              <div>Property Index: {Number(complaint.propertyIndex)}</div>
              <div>Description: {complaint.description}</div>
              <div>Confirmed: {complaint.confirmed}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTransaction = () => {
    return (
      <>
        {propertyLoading && <div>Check wallet...</div>}
        {isPending && <div>Transaction pending...</div>}
        {isSuccess && <div>Transaction Hash: {propertyData?.hash}</div>}
        {propertyIsError && (
          <div>{(propertyError as BaseError)?.shortMessage}</div>
        )}
      </>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-20">
      <div className="w-full">
        Profile
        <div className={"flex justify-between items-center " + sectionClass}>
          <div className="flex justify-start rounded-xl border-white">
            {ownProperties?.map((property) => {
              return (
                <div>
                  <div>Property Address: {property.propertyAddress}</div>
                  <div>Property Owner Name: {property.ownerName}</div>
                  <div>Property Type: {property.propertyType}</div>
                  <Button
                    onClick={() => {
                      setPropertyIndex(property.propertyIndex);
                      setOpenComplaintForm(true);
                    }}
                    variant="contained"
                    size="small"
                  >
                    Complain
                  </Button>
                </div>
              );
            })}
          </div>
          <ConnectKitButton />
        </div>
      </div>

      <div className="w-full">
        Events and Complaints{" "}
        <div className={"flex justify-between items-center " + sectionClass}>
          <div>{renderComplaintList()}</div>
          <div>
            {/* <Button onClick={() => setOpenPropertyForm(true)} variant="contained" size="small">
              Add Property
            </Button> */}
          </div>
        </div>
      </div>

      <div className="w-full">
        Properties
        <div className={"flex justify-between items-center " + sectionClass}>
          <div>{renderPropertyList()}</div>
          <div>
            <Button
              onClick={() => setOpenPropertyForm(true)}
              variant="contained"
              size="small"
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>

      {renderTransaction()}

      <Dialog
        open={openPropertyForm}
        onClose={() => setOpenPropertyForm(false)}
      >
        {renderPropertyForm()}
      </Dialog>

      <Dialog
        open={openComplaintForm}
        onClose={() => setOpenComplaintForm(false)}
      >
        {renderComplaintForm()}
      </Dialog>
    </main>
  );
}

const sectionClass = " border rounded-lg border-slate-600 p-5";

const contract = {
  address: process.env.NEXT_PUBLIC_LEASE_CONTRACT as Address,
  abi: Lease__factory.abi,
} as const;

enum PropertyType {
  House,
  Shop,
}
enum ConfirmationType {
  none,
  confirm,
  reject,
}

interface Complaint {
  complainant?: Address;
  whoAbout: Address;
  propertyIndex: bigint;
  description?: string;
  confirmed?: ConfirmationType;
}

interface LeaseInfo {
  tenantAddress: Address;
  tenantName: string;
  startDate: bigint;
  endDate: bigint;
  isActive: boolean;
  duration: bigint;
  terminationRequester: string;
  terminationReason: string;
  terminationRequestTime: bigint;
}

interface PropertyInfo {
  propertyIndex: bigint;
  propertyAddress: string;
  owner: Address;
  propertyType: PropertyType;
  ownerName: string;
  leaseInfo: LeaseInfo;
  isListed: boolean;
}
