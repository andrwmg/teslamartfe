import { Button } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function ResetFiltersButton() {
    const { resetFilters } = useContext(ListingContext)
    return (
        <Button
            variant="text" onClick={resetFilters} size="small" fullWidth style={{ whiteSpace: 'nowrap', overflow: 'nowrap' }}>
            Clear Filters
        </Button>
    )
})