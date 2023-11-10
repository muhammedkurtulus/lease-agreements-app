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
    <div className="grid sticky top-0 justify-items-center w-full sm:text-base text-xs backdrop-blur-md rounded-md p-3">
      {loadingFunction && <div>Check wallet...</div>}

      {isPending && (
        <div className="text-yellow-700">Transaction pending...</div>
      )}

      {isSuccess && (
        <div className="grid gap-1">
          <p className="border-b border-black">
            Last Transaction Hash on Polygon Mumbai
          </p>
          <p className="text-green-800">{resultFunction?.hash}</p>
        </div>
      )}

      {isErrorFunction && (
        <div className="text-red-700 text-center">
          <p>{(errorFunction as BaseError)?.shortMessage}</p>
          <p>
            {(errorFunction as BaseError)?.metaMessages?.[0].startsWith(
              "Error"
            ) && (errorFunction as BaseError)?.metaMessages?.[0]}
          </p>
        </div>
      )}
    </div>
  );
};
