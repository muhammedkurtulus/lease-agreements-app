"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { WriteContractResult } from "wagmi/actions";

const ContractContext = createContext(
  {} as {
    loadingFunction: boolean;
    isErrorFunction: boolean;
    errorFunction: Error | null;
    setLoadingFunction: Dispatch<SetStateAction<boolean>>;
    setIsErrorFunction: Dispatch<SetStateAction<boolean>>;
    setErrorFunction: Dispatch<SetStateAction<Error | null>>;
    resultFunction: WriteContractResult | undefined;
    setResultFunction: Dispatch<
      SetStateAction<WriteContractResult | undefined>
    >;
  }
);

export const ContractContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadingFunction, setLoadingFunction] = useState(false);
  const [isErrorFunction, setIsErrorFunction] = useState(false);
  const [errorFunction, setErrorFunction] = useState<Error | null>(null);
  const [resultFunction, setResultFunction] = useState<
    WriteContractResult | undefined
  >();
  return (
    <ContractContext.Provider
      value={{
        loadingFunction,
        isErrorFunction,
        errorFunction,
        setLoadingFunction,
        setIsErrorFunction,
        setErrorFunction,
        resultFunction,
        setResultFunction,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
