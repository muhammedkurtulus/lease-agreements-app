import {
  buttonGroupClass,
  dialogContentClass,
  ellipsisClass,
} from "@/app/classes";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, DialogContent, DialogTitle, Tooltip } from "@mui/material";
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
    if (!data) return;
    setResultFunction(data);
  }, [data]);

  useEffect(() => {
    if (!error) return;
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
      <DialogTitle className="border-b-2">Review Complaint</DialogTitle>
      <DialogContent className={dialogContentClass}>
        <div className="overflow-hidden">
          <Tooltip title={selectedComplaint?.complainant}>
            <p className={ellipsisClass}>
              Complainant Address: {selectedComplaint?.complainant}
            </p>
          </Tooltip>

          <Tooltip title={selectedComplaint?.whoAbout}>
            <p className={ellipsisClass}>
              Complained Address: {selectedComplaint?.whoAbout}
            </p>
          </Tooltip>

          <p>Property Index: {Number(selectedComplaint?.propertyIndex)}</p>

          <p>Complaint Index: {Number(selectedComplaint?.complaintIndex)}</p>

          <Tooltip title={selectedComplaint?.description}>
            <p className={ellipsisClass}>
              Description: {selectedComplaint?.description}
            </p>
          </Tooltip>
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
