import { PropertyInfo } from "@/app/types";
import { useContractContext } from "@/providers/ContractContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAccount, useContractWrite } from "wagmi";

export const ListingStatusButtons = ({
  property,
}: {
  property: PropertyInfo;
}) => {
  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: unlistProperty,
    data: unlistData,
    error: unlistError,
    isLoading: unlistIsLoading,
    isError: unlistIsError,
  } = useContractWrite({
    ...contract,
    functionName: "unlistProperty",
  });

  const {
    write: listProperty,
    data: listData,
    error: listError,
    isLoading: listIsLoading,
    isError: listIsError,
  } = useContractWrite({
    ...contract,
    functionName: "listProperty",
  });

  const { address } = useAccount();

  useEffect(() => {
    setResultFunction(unlistData);
  }, [unlistData]);

  useEffect(() => {
    setErrorFunction(unlistError);
  }, [unlistError]);

  useEffect(() => {
    setLoadingFunction(unlistIsLoading);
  }, [unlistIsLoading]);

  useEffect(() => {
    setIsErrorFunction(unlistIsError);
  }, [unlistIsError]);

  useEffect(() => {
    setResultFunction(listData);
  }, [listData]);

  useEffect(() => {
    setErrorFunction(listError);
  }, [listError]);

  useEffect(() => {
    setLoadingFunction(listIsLoading);
  }, [listIsLoading]);

  useEffect(() => {
    setIsErrorFunction(listIsError);
  }, [listIsError]);

  return (
    property.owner === address &&
    (property.isListed ? (
      <Button
        onClick={() => {
          unlistProperty({
            args: [property.propertyIndex],
          });
        }}
        variant="contained"
        size="small"
        color="error"
      >
        Unlist
      </Button>
    ) : (
      <Button
        onClick={() => {
          listProperty({
            args: [property.propertyIndex],
          });
        }}
        variant="contained"
        size="small"
        color="success"
      >
        List
      </Button>
    ))
  );
};
