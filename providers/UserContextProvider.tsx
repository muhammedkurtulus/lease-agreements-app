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
    openStartLeaseForm: StartLeaseForm;
    selectedProperty: PropertyInfo | undefined;
    relatedProperties: PropertyInfo[] | undefined;
    propertyIndex: bigint | undefined;
    setOpenPropertyForm: Dispatch<SetStateAction<boolean>>;
    setOpenComplaintForm: Dispatch<SetStateAction<boolean>>;
    setOpenStartLeaseForm: Dispatch<SetStateAction<StartLeaseForm>>;
    setSelectedProperty: Dispatch<SetStateAction<PropertyInfo | undefined>>;
    setRelatedProperties: Dispatch<SetStateAction<PropertyInfo[] | undefined>>;
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
  const [openStartLeaseForm, setOpenStartLeaseForm] = useState<StartLeaseForm>({
    opened: false,
  });
  const [selectedProperty, setSelectedProperty] = useState<PropertyInfo>();
  const [relatedProperties, setRelatedProperties] = useState<PropertyInfo[]>();
  const [propertyIndex, setPropertyIndex] = useState<bigint>();

  return (
    <UserContext.Provider
      value={{
        openPropertyForm,
        openComplaintForm,
        openStartLeaseForm,
        selectedProperty,
        relatedProperties,
        propertyIndex,
        setOpenPropertyForm,
        setOpenComplaintForm,
        setOpenStartLeaseForm,
        setSelectedProperty,
        setRelatedProperties,
        setPropertyIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

interface StartLeaseForm {
  opened: boolean;
  fromTenant?: boolean;
}
