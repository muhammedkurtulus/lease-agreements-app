"use client";

import { PropertyInfo } from "@/app/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const UserContext = createContext(
  {} as {
    openPropertyForm: boolean;
    openComplaintForm: boolean;
    openStartLeaseForm: boolean;
    selectedProperty: PropertyInfo | undefined;
    ownProperties: PropertyInfo[] | undefined;
    leasedProperties: PropertyInfo[] | undefined;
    propertyIndex: bigint | undefined;
    setOpenPropertyForm: Dispatch<SetStateAction<boolean>>;
    setOpenComplaintForm: Dispatch<SetStateAction<boolean>>;
    setOpenStartLeaseForm: Dispatch<SetStateAction<boolean>>;
    setSelectedProperty: Dispatch<SetStateAction<PropertyInfo | undefined>>;
    setOwnProperties: Dispatch<SetStateAction<PropertyInfo[] | undefined>>;
    setLeasedProperties: Dispatch<SetStateAction<PropertyInfo[] | undefined>>;
    setPropertyIndex: Dispatch<SetStateAction<bigint | undefined>>;
  }
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openPropertyForm, setOpenPropertyForm] = useState(false);
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const [openStartLeaseForm, setOpenStartLeaseForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyInfo>();
  const [ownProperties, setOwnProperties] = useState<PropertyInfo[]>();
  const [leasedProperties, setLeasedProperties] = useState<PropertyInfo[]>();
  const [propertyIndex, setPropertyIndex] = useState<bigint>();

  return (
    <UserContext.Provider
      value={{
        openPropertyForm,
        openComplaintForm,
        openStartLeaseForm,
        selectedProperty,
        ownProperties,
        leasedProperties,
        propertyIndex,
        setOpenPropertyForm,
        setOpenComplaintForm,
        setOpenStartLeaseForm,
        setSelectedProperty,
        setOwnProperties,
        setLeasedProperties,
        setPropertyIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
