import { PropertyType } from "@/app/types";
import { useContractContext } from "@/providers/ContractContextProvider";
import { contract } from "@/providers/WalletProvider";
import { DialogContent, DialogTitle } from "@mui/material";
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
      <DialogTitle>Add Property</DialogTitle>
      <DialogContent>
        <form
          className="grid gap-y-5 text-black"
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
          <input name="propertyAddress" placeholder="Property Address" />
          <input name="propertyOwnerName" placeholder="Property Owner Name" />
          <select name="propertyType">
            <option value={PropertyType.House}>House</option>
            <option value={PropertyType.Shop}>Shop</option>
          </select>
          <button className="bg-white" disabled={isLoading} type="submit">
            Add
          </button>
        </form>
      </DialogContent>
    </>
  );
};
