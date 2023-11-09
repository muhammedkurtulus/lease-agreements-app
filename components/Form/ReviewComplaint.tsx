import { buttonGroupClass } from "@/app/classes";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, DialogContent, DialogTitle } from "@mui/material";
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
      <DialogTitle>Review Complaint</DialogTitle>
      <DialogContent className="grid gap-3">
        <div>
          <p>Complainant Address: {selectedComplaint?.complainant}</p>
          <p>Complained Address: {selectedComplaint?.whoAbout}</p>
          <p>Property Index: {Number(selectedComplaint?.propertyIndex)}</p>
          <p>Complaint Index: {Number(selectedComplaint?.complaintIndex)}</p>
          <p>Description: {selectedComplaint?.description}</p>
        </div>

        <div className={buttonGroupClass}>
          <Button
            className="bg-white"
            disabled={isLoading}
            variant="contained"
            size="small"
            color="warning"
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
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            disabled={isLoading}
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
          </Button>
        </div>
      </DialogContent>
    </>
  );
};
