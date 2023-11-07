"use client";

import { AddProperty } from "@/components/Form/AddProperty";
import { StartLease } from "@/components/Form/StartLease";
import { SubmitComplaint } from "@/components/Form/SubmitComplaint";
import { LeaseInfo } from "@/components/LeaseInfo";
import { Complaints } from "@/components/List/Complaints";
import { Profile } from "@/components/List/Profile";
import { Properties } from "@/components/List/Properties";
import { TransactionInfo } from "@/components/TransactionInfo";
import { useContractContext } from "@/providers/ContractContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, Dialog } from "@mui/material";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { useContractRead, useWaitForTransaction } from "wagmi";

export default function Home() {
  const {
    openPropertyForm,
    openComplaintForm,
    openStartLeaseForm,
    selectedProperty,
    setOpenPropertyForm,
    setOpenComplaintForm,
    setOpenStartLeaseForm,
    setSelectedProperty,
  } = useUserContext();

  const { resultFunction } = useContractContext();

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
          <div>
            <Complaints />
          </div>
        </div>
      </div>

      <div className="w-full">
        Properties
        <div className={sectionClass}>
          <div>
            <Properties />
          </div>
          <div>
            <Button
              onClick={() => setOpenPropertyForm(true)}
              variant="contained"
              size="small"
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
        open={openStartLeaseForm}
        onClose={() => setOpenStartLeaseForm(false)}
      >
        <StartLease />
      </Dialog>

      <Dialog
        open={selectedProperty !== undefined}
        onClose={() => setSelectedProperty(undefined)}
      >
        <LeaseInfo />
      </Dialog>
    </main>
  );
}

const sectionClass =
  "flex justify-evenly items-center border-2 rounded-lg border-slate-600 p-5";
