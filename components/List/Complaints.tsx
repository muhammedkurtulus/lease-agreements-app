import { cardClass, listClass } from "@/app/types";
import { contract } from "@/providers/WalletProvider";
import { useContractRead } from "wagmi";

export const Complaints = () => {
  const { data: complaints } = useContractRead({
    ...contract,
    functionName: "getAllComplaints",
  });
  return (
    <div className={listClass}>
      {complaints?.map((complaint) => {
        return (
          <div className={cardClass} key={complaint.whoAbout}>
            <p>Complainant Address: {complaint.complainant}</p>
            <p>Who About: {complaint.whoAbout}</p>
            <p>Property Index: {Number(complaint.propertyIndex)}</p>
            <p>Description: {complaint.description}</p>
            <p>Confirmed: {complaint.confirmed}</p>
          </div>
        );
      })}
    </div>
  );
};
