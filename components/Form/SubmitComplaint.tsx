import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useContractWrite } from "wagmi";

export const SubmitComplaint = () => {
  const { propertyIndex } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: submitComplaint,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "submitComplaint",
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
          <button className="bg-white" disabled={isLoading} type="submit">
            Submit
          </button>
        </form>
      </DialogContent>
    </>
  );
};
