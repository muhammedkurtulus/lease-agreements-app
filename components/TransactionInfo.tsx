import { useContractContext } from "@/providers/ContractContextProvider";
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

      {isPending && (
        <div className="text-yellow-700">Transaction pending...</div>
      )}

      {isSuccess && (
        <div className="text-blue-800">{`Last Transaction Hash: ${resultFunction?.hash}`}</div>
      )}

      {isErrorFunction && (
        <div className="text-red-700">
          {(errorFunction as BaseError)?.message}
        </div>
      )}
    </div>
  );
};
