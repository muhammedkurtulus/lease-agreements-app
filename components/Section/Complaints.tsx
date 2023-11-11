import {
  buttonGroupClass,
  cardClass,
  ellipsisClass,
  listClass,
  propertyTypeClass,
} from "@/app/classes";
import { Complaint, Status } from "@/app/types";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button, Tooltip } from "@mui/material";
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

  return (
    complaints &&
    complaints.length > 0 && (
      <div className={listClass}>
        {complaints.map((complaint: Complaint) => {
          return (
            <div className={cardClass} key={complaint.complaintIndex}>
              <div className={propertyTypeClass}>
                {complaint.status === Status.none ? (
                  <span>Not Reviewed</span>
                ) : complaint.status === Status.confirm ? (
                  <span className="text-green-700">Confirmed</span>
                ) : (
                  <span className="text-red-700">Rejected</span>
                )}
              </div>

              <div className="overflow-hidden">
                <Tooltip title={complaint.complainant}>
                  <p className={ellipsisClass}>
                    Complainant Address: {complaint.complainant}
                  </p>
                </Tooltip>

                <Tooltip title={complaint.whoAbout}>
                  <p className={ellipsisClass}>
                    Who About: {complaint.whoAbout}
                  </p>
                </Tooltip>

                <p>Property Index: {Number(complaint.propertyIndex)}</p>

                <p>Complaint Index: {Number(complaint.complaintIndex)}</p>

                <Tooltip title={complaint.description}>
                  <p className={ellipsisClass + " text-orange-800"}>
                    Description: {complaint.description}
                  </p>
                </Tooltip>
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
