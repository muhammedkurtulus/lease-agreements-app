/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Events, EventsInterface } from "../../utils/Events";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "complainant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "whoAbout",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "propertyIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "propertyOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "conclusion",
        type: "string",
      },
    ],
    name: "ComplaintConcluded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "complainant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "whoAbout",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "propertyIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "propertyOwner",
        type: "address",
      },
    ],
    name: "ComplaintReported",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "ownerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "propertyIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PropertyType",
        name: "propertyType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tenantName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "terminationReason",
        type: "string",
      },
    ],
    name: "LeaseEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "ownerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "propertyIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PropertyType",
        name: "propertyType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyAddress",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tenantName",
        type: "string",
      },
    ],
    name: "LeaseStarted",
    type: "event",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220afb05b4335a54a3ad6ecc8965131773f87515649c14da04f92141d638e80cbff64736f6c63430008130033";

type EventsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EventsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Events__factory extends ContractFactory {
  constructor(...args: EventsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Events & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Events__factory {
    return super.connect(runner) as Events__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EventsInterface {
    return new Interface(_abi) as EventsInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Events {
    return new Contract(address, _abi, runner) as unknown as Events;
  }
}
