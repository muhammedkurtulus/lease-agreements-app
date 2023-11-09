import { Address } from "viem";

export const listClass =
  "grid grid-cols-2 min-[1520px]:grid-cols-3 max-[1120px]:grid-cols-1 gap-4 overflow-y-scroll h-48 p-2 border rounded-l-xl border-green-800";

export const cardClass = "border-2 rounded-xl p-3 border-green-800";

export enum PropertyType {
  House,
  Shop,
}

export enum ConfirmationType {
  none,
  confirm,
  reject,
}

export interface Complaint {
  complainant?: Address;
  whoAbout: Address;
  complaintIndex: bigint;
  propertyIndex: bigint;
  description?: string;
  confirmed?: ConfirmationType;
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
