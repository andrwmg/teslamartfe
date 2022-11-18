import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "./contexts/ListingContext"

export default function LocationField() {
    const { location, setLocation } = useContext(ListingContext)

    const handleChange = (event) => {
        setLocation(event.target.value)
    }
    return (
        <TextField
            id="locationField"
            label="Location"
            type="text"
            onChange={handleChange}
            value={location}
            autoComplete="current-location"
            size="small"
            fullWidth
            required
        />
    )
}
