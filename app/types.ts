import { Address } from "viem";

export enum PropertyType {
  House,
  Shop,
}

export enum Status {
  none,
  confirm,
  reject,
}

export interface Complaint {
  complainant: Address;
  whoAbout: Address;
  reviewer: Address;
  complaintIndex: bigint;
  propertyIndex: bigint;
  description: string;
  status: Status;
}

export interface LeaseInfo {
  tenantAddress: Address;
  initiatorAddress: Address;
  tenantName: string;
  startDate: bigint;
  endDate: bigint;
  isActive: boolean;
  duration: bigint;
  terminationRequester: string;
  terminationReason: string;
  terminationRequestTime: bigint;
}

export interface PropertyInfo {
  propertyIndex: bigint;
  propertyAddress: string;
  owner: Address;
  propertyType: PropertyType;
  ownerName: string;
  leaseInfo: LeaseInfo;
  isListed: boolean;
}
