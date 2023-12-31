/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  FunctionFragment,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
} from "./common";

export interface EventsInterface extends Interface {
  getEvent(
    nameOrSignatureOrTopic:
      | "ComplaintReported"
      | "LeaseEnded"
      | "LeaseStarted"
      | "TerminationRequested"
  ): EventFragment;
}

export namespace ComplaintReportedEvent {
  export type InputTuple = [
    complainant: AddressLike,
    whoAbout: AddressLike,
    propertyIndex: BigNumberish,
    propertyAddress: string,
    description: string,
    tenantAddress: AddressLike,
    propertyOwner: AddressLike
  ];
  export type OutputTuple = [
    complainant: string,
    whoAbout: string,
    propertyIndex: bigint,
    propertyAddress: string,
    description: string,
    tenantAddress: string,
    propertyOwner: string
  ];
  export interface OutputObject {
    complainant: string;
    whoAbout: string;
    propertyIndex: bigint;
    propertyAddress: string;
    description: string;
    tenantAddress: string;
    propertyOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LeaseEndedEvent {
  export type InputTuple = [
    tenantAddress: AddressLike,
    ownerAddress: AddressLike,
    propertyIndex: BigNumberish,
    startDate: BigNumberish,
    endDate: BigNumberish,
    propertyType: BigNumberish,
    propertyAddress: string,
    ownerName: string,
    tenantName: string,
    terminationReason: string
  ];
  export type OutputTuple = [
    tenantAddress: string,
    ownerAddress: string,
    propertyIndex: bigint,
    startDate: bigint,
    endDate: bigint,
    propertyType: bigint,
    propertyAddress: string,
    ownerName: string,
    tenantName: string,
    terminationReason: string
  ];
  export interface OutputObject {
    tenantAddress: string;
    ownerAddress: string;
    propertyIndex: bigint;
    startDate: bigint;
    endDate: bigint;
    propertyType: bigint;
    propertyAddress: string;
    ownerName: string;
    tenantName: string;
    terminationReason: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace LeaseStartedEvent {
  export type InputTuple = [
    tenantAddress: AddressLike,
    ownerAddress: AddressLike,
    propertyIndex: BigNumberish,
    startDate: BigNumberish,
    endDate: BigNumberish,
    propertyType: BigNumberish,
    propertyAddress: string,
    ownerName: string,
    tenantName: string
  ];
  export type OutputTuple = [
    tenantAddress: string,
    ownerAddress: string,
    propertyIndex: bigint,
    startDate: bigint,
    endDate: bigint,
    propertyType: bigint,
    propertyAddress: string,
    ownerName: string,
    tenantName: string
  ];
  export interface OutputObject {
    tenantAddress: string;
    ownerAddress: string;
    propertyIndex: bigint;
    startDate: bigint;
    endDate: bigint;
    propertyType: bigint;
    propertyAddress: string;
    ownerName: string;
    tenantName: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TerminationRequestedEvent {
  export type InputTuple = [
    requesterAddress: AddressLike,
    propertyIndex: BigNumberish,
    propertyAddress: string,
    ownerName: string,
    tenantName: string,
    reason: string
  ];
  export type OutputTuple = [
    requesterAddress: string,
    propertyIndex: bigint,
    propertyAddress: string,
    ownerName: string,
    tenantName: string,
    reason: string
  ];
  export interface OutputObject {
    requesterAddress: string;
    propertyIndex: bigint;
    propertyAddress: string;
    ownerName: string;
    tenantName: string;
    reason: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Events extends BaseContract {
  connect(runner?: ContractRunner | null): Events;
  waitForDeployment(): Promise<this>;

  interface: EventsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getEvent(
    key: "ComplaintReported"
  ): TypedContractEvent<
    ComplaintReportedEvent.InputTuple,
    ComplaintReportedEvent.OutputTuple,
    ComplaintReportedEvent.OutputObject
  >;
  getEvent(
    key: "LeaseEnded"
  ): TypedContractEvent<
    LeaseEndedEvent.InputTuple,
    LeaseEndedEvent.OutputTuple,
    LeaseEndedEvent.OutputObject
  >;
  getEvent(
    key: "LeaseStarted"
  ): TypedContractEvent<
    LeaseStartedEvent.InputTuple,
    LeaseStartedEvent.OutputTuple,
    LeaseStartedEvent.OutputObject
  >;
  getEvent(
    key: "TerminationRequested"
  ): TypedContractEvent<
    TerminationRequestedEvent.InputTuple,
    TerminationRequestedEvent.OutputTuple,
    TerminationRequestedEvent.OutputObject
  >;

  filters: {
    "ComplaintReported(address,address,uint256,string,string,address,address)": TypedContractEvent<
      ComplaintReportedEvent.InputTuple,
      ComplaintReportedEvent.OutputTuple,
      ComplaintReportedEvent.OutputObject
    >;
    ComplaintReported: TypedContractEvent<
      ComplaintReportedEvent.InputTuple,
      ComplaintReportedEvent.OutputTuple,
      ComplaintReportedEvent.OutputObject
    >;

    "LeaseEnded(address,address,uint256,uint256,uint256,uint8,string,string,string,string)": TypedContractEvent<
      LeaseEndedEvent.InputTuple,
      LeaseEndedEvent.OutputTuple,
      LeaseEndedEvent.OutputObject
    >;
    LeaseEnded: TypedContractEvent<
      LeaseEndedEvent.InputTuple,
      LeaseEndedEvent.OutputTuple,
      LeaseEndedEvent.OutputObject
    >;

    "LeaseStarted(address,address,uint256,uint256,uint256,uint8,string,string,string)": TypedContractEvent<
      LeaseStartedEvent.InputTuple,
      LeaseStartedEvent.OutputTuple,
      LeaseStartedEvent.OutputObject
    >;
    LeaseStarted: TypedContractEvent<
      LeaseStartedEvent.InputTuple,
      LeaseStartedEvent.OutputTuple,
      LeaseStartedEvent.OutputObject
    >;

    "TerminationRequested(address,uint256,string,string,string,string)": TypedContractEvent<
      TerminationRequestedEvent.InputTuple,
      TerminationRequestedEvent.OutputTuple,
      TerminationRequestedEvent.OutputObject
    >;
    TerminationRequested: TypedContractEvent<
      TerminationRequestedEvent.InputTuple,
      TerminationRequestedEvent.OutputTuple,
      TerminationRequestedEvent.OutputObject
    >;
  };
}
