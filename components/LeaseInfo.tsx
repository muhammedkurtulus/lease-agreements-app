import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useUserContext } from "@/providers/UserContextProvider";

export const LeaseInfo = () => {
  const { selectedProperty, setOpenComplaintForm, setPropertyIndex } =
    useUserContext();

  return (
    <>
      <DialogTitle>Lease</DialogTitle>
      <DialogContent>
        {selectedProperty?.leaseInfo.isActive && (
          <Button
            onClick={() => {
              setPropertyIndex(selectedProperty?.propertyIndex);
              setOpenComplaintForm(true);
            }}
            variant="contained"
            size="small"
            color="error"
          >
            Complain
          </Button>
        )}
        {/* //TODO: Termination buttonu koy */}
      </DialogContent>
    </>
  );
};
