import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useContractWrite } from "wagmi";

export const ReviewComplaint = () => {
  const { selectedComplaint } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: reviewComplaint,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "reviewComplaint",
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
        <p>Complainant Address: {selectedComplaint?.complainant}</p>
        <p>Complained Address: {selectedComplaint?.whoAbout}</p>
        <p>Property Index: {Number(selectedComplaint?.propertyIndex)}</p>
        <p>Complaint Index: {Number(selectedComplaint?.complaintIndex)}</p>

        <button
          className="bg-white"
          disabled={isLoading}
          type="submit"
          onClick={() =>
            reviewComplaint({
              args: [
                selectedComplaint?.propertyIndex!,
                selectedComplaint?.complaintIndex!,
                selectedComplaint?.whoAbout!,
                true,
              ],
            })
          }
        >
          Confirm
        </button>
        <button
          className="bg-white"
          disabled={isLoading}
          type="submit"
          onClick={() =>
            reviewComplaint({
              args: [
                selectedComplaint?.propertyIndex!,
                selectedComplaint?.complaintIndex!,
                selectedComplaint?.whoAbout!,
                false,
              ],
            })
          }
        >
          Reject
        </button>
      </DialogContent>
    </>
  );
};
