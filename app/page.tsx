"use client";

import { AddProperty } from "@/components/Form/AddProperty";
import { RequestTermination } from "@/components/Form/RequestTermination";
import { ReviewComplaint } from "@/components/Form/ReviewComplaint";
import { StartLease } from "@/components/Form/StartLease";
import { SubmitComplaint } from "@/components/Form/SubmitComplaint";
import { LeaseInfo } from "@/components/LeaseInfo";
import { Complaints } from "@/components/Section/Complaints";
import { Profile } from "@/components/Section/Profile";
import { Properties } from "@/components/Section/Properties";
import { TransactionInfo } from "@/components/TransactionInfo";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, Dialog } from "@mui/material";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { useAccount, useContractRead, useWaitForTransaction } from "wagmi";
import { sectionClass } from "./classes";

export default function Home() {
  const {
    openPropertyForm,
    openComplaintForm,
    openStartLeaseForm,
    selectedProperty,
    setOpenPropertyForm,
    setOpenComplaintForm,
    setOpenStartLeaseForm,
    openRequestTermination,
    setOpenRequestTermination,
    openReviewComplaint,
    setOpenReviewComplaint,
    openLeaseInfo,
    setOpenLeaseInfo,
  } = useUserContext();

  const { resultFunction } = useContractContext();

  const { address } = useAccount();

  const { refetch: getAllProperties } = useContractRead({
    ...contract,
    functionName: "getAllProperties",
  });

  const { refetch: getAllComplaints } = useContractRead({
    ...contract,
    functionName: "getAllComplaints",
  });

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: resultFunction?.hash,
  });

  useEffect(() => {
    getAllProperties();
    getAllComplaints();

    setOpenLeaseInfo(false);
    setOpenComplaintForm(false);
    setOpenPropertyForm(false);
    setOpenRequestTermination(false);
    setOpenReviewComplaint(false);
    setOpenStartLeaseForm({ opened: false });
  }, [isSuccess]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly px-3 md:px-20">
      <div className="w-full">
        Profile
        <div className={sectionClass}>
          <Profile />
          <ConnectKitButton />
        </div>
      </div>

      <div className="w-full">
        Complaints
        <div className={sectionClass}>
          <Complaints />
        </div>
      </div>

      <div className="w-full">
        Properties
        <div className={sectionClass}>
          <Properties />

          <div>
            <Button
              onClick={() => setOpenPropertyForm(true)}
              variant="contained"
              size="small"
              disabled={!address}
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>

      <TransactionInfo isPending={isPending} isSuccess={isSuccess} />

      <Dialog
        open={openPropertyForm}
        onClose={() => setOpenPropertyForm(false)}
      >
        <AddProperty />
      </Dialog>

      <Dialog
        open={openComplaintForm}
        onClose={() => setOpenComplaintForm(false)}
      >
        <SubmitComplaint />
      </Dialog>

      <Dialog
        open={openStartLeaseForm!.opened}
        onClose={() => setOpenStartLeaseForm({ opened: false })}
      >
        <StartLease />
      </Dialog>

      <Dialog open={openLeaseInfo} onClose={() => setOpenLeaseInfo(false)}>
        <LeaseInfo />
      </Dialog>

      <Dialog
        open={openRequestTermination}
        onClose={() => setOpenRequestTermination(false)}
      >
        <RequestTermination />
      </Dialog>

      <Dialog
        open={openReviewComplaint}
        onClose={() => setOpenReviewComplaint(false)}
      >
        <ReviewComplaint />
      </Dialog>
    </main>
  );
}
