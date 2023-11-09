import {
  buttonGroupClass,
  cardClass,
  listClass,
  propertyTypeClass,
} from "@/app/classes";
import { Complaint } from "@/app/types";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button } from "@mui/material";
import { useState } from "react";
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

  return (
    complaints &&
    complaints.length > 0 && (
      <div className={listClass}>
        {complaints.map((complaint: Complaint) => {
          return (
            <div className={cardClass} key={complaint.complaintIndex}>
              <div className={propertyTypeClass}>
                {complaint.reviewer
                  ? complaint.confirmed
                    ? "Confirmed"
                    : "Not Confirmed"
                  : "Not Reviewed"}
              </div>

              <div>
                <p>Complainant Address: {complaint.complainant}</p>
                <p>Who About: {complaint.whoAbout}</p>
                <p>Property Index: {Number(complaint.propertyIndex)}</p>
                <p>Complaint Index: {Number(complaint.complaintIndex)}</p>
                <p>Description: {complaint.description}</p>
                <p>Confirmed: {complaint.confirmed}</p>
              </div>

              {!(
                complaint?.complainant === address ||
                complaint?.whoAbout === address
              ) && (
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
