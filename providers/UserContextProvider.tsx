"use client";

import { Complaint, PropertyInfo } from "@/app/types";
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
    openRequestTermination: boolean;
    openReviewComplaint: boolean;
    selectedComplaint: Complaint | undefined;
    openLeaseInfo: boolean;
    setOpenPropertyForm: Dispatch<SetStateAction<boolean>>;
    setOpenComplaintForm: Dispatch<SetStateAction<boolean>>;
    setOpenStartLeaseForm: Dispatch<SetStateAction<StartLeaseForm>>;
    setSelectedProperty: Dispatch<SetStateAction<PropertyInfo | undefined>>;
    setRelatedProperties: Dispatch<SetStateAction<PropertyInfo[] | undefined>>;
    setOpenRequestTermination: Dispatch<SetStateAction<boolean>>;
    setOpenReviewComplaint: Dispatch<SetStateAction<boolean>>;
    setSelectedComplaint: Dispatch<SetStateAction<Complaint | undefined>>;
    setOpenLeaseInfo: Dispatch<SetStateAction<boolean>>;
  }
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openPropertyForm, setOpenPropertyForm] = useState(false);
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const [openRequestTermination, setOpenRequestTermination] = useState(false);
  const [openReviewComplaint, setOpenReviewComplaint] = useState(false);
  const [openLeaseInfo, setOpenLeaseInfo] = useState(false);
  const [openStartLeaseForm, setOpenStartLeaseForm] = useState<StartLeaseForm>({
    opened: false,
  });
  const [selectedProperty, setSelectedProperty] = useState<PropertyInfo>();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint>();
  const [relatedProperties, setRelatedProperties] = useState<PropertyInfo[]>();

  return (
    <UserContext.Provider
      value={{
        openPropertyForm,
        openComplaintForm,
        openStartLeaseForm,
        selectedProperty,
        relatedProperties,
        openRequestTermination,
        openReviewComplaint,
        selectedComplaint,
        openLeaseInfo,
        setOpenPropertyForm,
        setOpenComplaintForm,
        setOpenStartLeaseForm,
        setSelectedProperty,
        setRelatedProperties,
        setOpenRequestTermination,
        setOpenReviewComplaint,
        setSelectedComplaint,
        setOpenLeaseInfo,
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
