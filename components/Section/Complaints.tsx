import {
  buttonGroupClass,
  cardClass,
  listClass,
  propertyTypeClass,
} from "@/app/classes";
import { Complaint, Status } from "@/app/types";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";

export const Complaints = () => {
  const { setSelectedComplaint, setOpenReviewComplaint } = useUserContext();

  const { address } = useAccount();

  const { data: complaints } = useContractRead({
    ...contract,
    functionName: "getAllComplaints",
  });

  const { data: isManager } = useContractRead({
    ...contract,
    functionName: "isManager",
    args: [address!],
    enabled: Boolean(address),
  });

  useEffect(() => {
    console.log("isManager", isManager);
  }, [isManager]);

  useEffect(() => {
    console.log("complaints", complaints);
  }, [complaints]);

  return (
    complaints &&
    complaints.length > 0 && (
      <div className={listClass}>
        {complaints.map((complaint: Complaint) => {
          return (
            <div className={cardClass} key={complaint.complaintIndex}>
              <div className={propertyTypeClass}>
                {complaint.status === Status.none ? (
                  <span >Not Reviewed</span>
                ) : complaint.status === Status.confirm ? (
                  <span className="text-green-700">Confirmed</span>
                ) : (
                  <span className="text-red-700">Rejected</span>
                )}
              </div>

              <div>
                <p>Complainant Address: {complaint.complainant}</p>
                <p>Who About: {complaint.whoAbout}</p>
                <p>Property Index: {Number(complaint.propertyIndex)}</p>
                <p>Complaint Index: {Number(complaint.complaintIndex)}</p>
                <p className="text-orange-800">Description: {complaint.description}</p>
              </div>

              {!(
                complaint?.complainant === address ||
                complaint?.whoAbout === address
              ) &&
                complaint.status === Status.none && (
                  <div className={buttonGroupClass}>
                    {isManager && (
                      <Button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setOpenReviewComplaint(true);
                        }}
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        Review
                      </Button>
                    )}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    )
  );
};
