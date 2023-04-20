import { Chip } from "@mui/material";
import React from "react";

export default function ListingFilterChip({filterKey, filterValue, handleDelete}) {

    const handleClick = () => {
        handleDelete(filterKey)
    }

    let label = filterValue
    if (filterKey === 'interior' || filterKey === 'exterior') {
        label += ' ' + filterKey.slice(0,1).toUpperCase() + filterKey.slice(1, filterKey.length)
    }

    return(
        <Chip label={label} variant="outlined" onDelete={handleClick} sx={{maxWidth: '150px', textOverflow: 'ellipsis'}} />
    )
}