import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useContractWrite } from "wagmi";

export const RequestTermination = () => {
  const { propertyIndex } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: requestTermination,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "requestTermination",
  });

  useEffect(() => {
    setResultFunction(data);
  }, [data]);

  useEffect(() => {
    setErrorFunction(error);
  }, [error]);

  useEffect(() => {
    setLoadingFunction(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setIsErrorFunction(isError);
  }, [isError]);

  return (
    <>
      <DialogTitle>Request Termination</DialogTitle>
      <DialogContent>
        <form
          className="grid gap-y-5 text-black"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const reason = formData.get("reason") as string;
            requestTermination({ args: [propertyIndex!, reason] });
          }}
        >
          <input name="reason" placeholder="Reason" />
          <button className="bg-white" disabled={isLoading} type="submit">
            Submit
          </button>
        </form>
      </DialogContent>
    </>
  );
};
