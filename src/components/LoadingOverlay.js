import React, { useContext } from "react";
import Dialog from '@mui/material/Dialog';
import { ListingContext } from "../contexts/ListingContext";
import { CircularProgress } from "@mui/material";

export default function DeleteConfirmation() {
    const { loading } = useContext(ListingContext)

    return (
        <div>
            <Dialog open={loading} 
            aria-labelledby='loading' PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  }}>
            <CircularProgress />
            </Dialog>
        </div>
    );
}


