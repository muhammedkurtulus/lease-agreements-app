import { formClass } from "@/app/classes";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";
import { useContractWrite } from "wagmi";

export const SubmitComplaint = () => {
  const { selectedProperty } = useUserContext();

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
      <DialogTitle>Submit Complaint</DialogTitle>
      <DialogContent>
        <form
          className={formClass}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const description = formData.get("description") as string;
            submitComplaint({
              args: [selectedProperty?.propertyIndex!, description],
            });
          }}
        >
          <TextField
            name="description"
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <Button
            variant="contained"
            size="small"
            color="warning"
            disabled={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </>
  );
};
