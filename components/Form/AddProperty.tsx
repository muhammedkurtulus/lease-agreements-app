import { formClass, inputClass } from "@/app/classes";
import { PropertyType } from "@/app/types";
import { useContractContext } from "@/providers/ContractContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";
import { useContractWrite } from "wagmi";

export const AddProperty = () => {
  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: addProperty,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "addProperty",
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
      <DialogTitle>Add Property</DialogTitle>
      <DialogContent>
        <form
          className={formClass}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const propertyAddress = formData.get("propertyAddress") as string;
            const propertyOwnerName = formData.get(
              "propertyOwnerName"
            ) as string;
            const propertyType = formData.get(
              "propertyType"
            ) as unknown as PropertyType;
            addProperty({
              args: [propertyAddress, propertyType, propertyOwnerName],
            });
          }}
        >
          <select className={inputClass} name="propertyType">
            <option value={PropertyType.House}>House</option>
            <option value={PropertyType.Shop}>Shop</option>
          </select>

          <TextField
            name="propertyAddress"
            label="Property Address"
            variant="outlined"
          />
          <TextField
            name="propertyOwnerName"
            label="Property Owner Name"
            variant="outlined"
          />

          <Button
            variant="contained"
            size="small"
            color="success"
            disabled={isLoading}
            type="submit"
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </>
  );
};
