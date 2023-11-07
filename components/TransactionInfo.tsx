import { useContractContext } from "@/providers/ContractContextProvider";
import { useEffect } from "react";
import { BaseError } from "viem";

export const TransactionInfo = ({
  isPending,
  isSuccess,
}: {
  isPending: boolean;
  isSuccess: boolean;
}) => {
  const { loadingFunction, isErrorFunction, errorFunction, resultFunction } =
    useContractContext();

  return (
    <div className="sm:text-base text-xs">
      {loadingFunction && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && <div>{`Transaction Hash: ${resultFunction?.hash}`}</div>}
      {isErrorFunction && <div>{(errorFunction as BaseError)?.message}</div>}
    </div>
  );
};
