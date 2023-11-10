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
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { sectionClass } from "./classes";
import { privateKeyToAccount } from "viem/accounts";

const ownerAccount = privateKeyToAccount(
  `0x${process.env.NEXT_PUBLIC_CONTRACT_OWNER!}` as Address
);

export default function Home() {
  const {
    openPropertyForm,
    openComplaintForm,
    openStartLeaseForm,
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

  const {
    setResultFunction,
    setErrorFunction,
    setIsErrorFunction,
    setLoadingFunction,
  } = useContractContext();

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

  const { data: isManager, refetch } = useContractRead({
    ...contract,
    functionName: "isManager",
    args: [address!],
    enabled: Boolean(address),
  });

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: resultFunction?.hash,
  });

  const {
    write: setManager,
    data,
    error,
    isLoading,
    isError,
  } = useContractWrite({
    ...contract,
    functionName: "setManager",
    account: ownerAccount,
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

  useEffect(() => {
    if (isSuccess) {
      getAllProperties();
      getAllComplaints();
      refetch();
    }

    setOpenLeaseInfo(false);
    setOpenComplaintForm(false);
    setOpenPropertyForm(false);
    setOpenRequestTermination(false);
    setOpenReviewComplaint(false);
    setOpenStartLeaseForm({ opened: false });
  }, [isSuccess, isPending]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly px-3 md:px-20">
      <TransactionInfo isPending={isPending} isSuccess={isSuccess} />

      <div className="w-full">
        Profile
        <div className={sectionClass}>
          <Profile />
          <div className="grid items-center justify-items-center gap-2">
            <ConnectKitButton />
            {address &&
              (isManager ? (
                <p className="text-center text-blue-800">Manager</p>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      setManager({
                        args: [address],
                      })
                    }
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!address}
                  >
                    Be Manager
                  </Button>
                  <p className="text-center text-sm">
                    You can be test manager for confirm complaints
                  </p>
                </>
              ))}
          </div>
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

      <div className="w-full">
        Complaints
        <div className={sectionClass}>
          <Complaints />
        </div>
      </div>

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
