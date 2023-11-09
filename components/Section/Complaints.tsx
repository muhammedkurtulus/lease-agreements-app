import { cardClass, listClass } from "@/app/types";
import { useUserContext } from "@/providers/UserContextProvider";
import { contract } from "@/providers/WalletProvider";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";

export const Complaints = () => {
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
  }, [address]);

  const { setSelectedComplaint, setOpenReviewComplaint } = useUserContext();

  return (
    complaints &&
    complaints.length > 0 && (
      <div className={listClass}>
        {complaints.map((complaint) => {
          return (
            <div className={cardClass} key={complaint.whoAbout}>
              <p>Complainant Address: {complaint.complainant}</p>
              <p>Who About: {complaint.whoAbout}</p>
              <p>Property Index: {Number(complaint.propertyIndex)}</p>
              <p>Description: {complaint.description}</p>
              <p>Confirmed: {complaint.confirmed}</p>

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
          );
        })}
      </div>
    )
  );
};
