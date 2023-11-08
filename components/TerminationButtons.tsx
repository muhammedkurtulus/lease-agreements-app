import { PropertyInfo } from "@/app/types";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAccount, useContractWrite } from "wagmi";

export const TerminationButtons = ({
  property,
}: {
  property: PropertyInfo;
}) => {
  const { setPropertyIndex, setOpenRequestTermination } = useUserContext();

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

  const {
    write: confirmTermination,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "confirmTermination",
  });

  const { address } = useAccount();

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
    property.owner === address &&
    (property.isListed ? (
      <Button
        onClick={() => {
          setPropertyIndex(property.propertyIndex);
          setOpenRequestTermination(true);
        }}
        variant="contained"
        size="small"
        color="error"
      >
        Request Termination
      </Button>
    ) : (
      <Button
        onClick={() => {
          confirmTermination({
            args: [property.propertyIndex],
          });
        }}
        variant="contained"
        size="small"
        color="success"
      >
        Confirm Termination
      </Button>
    ))
  );
};