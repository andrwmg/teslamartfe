import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "./contexts/ListingContext"

export default function MileageField() {
    const { mileage, setMileage } = useContext(ListingContext)

    const handleChange = (event) => {
        setMileage(event.target.value)
    }
    return (
        <TextField
            id="mileageField"
            label="Mileage"
            type="number"
            onChange={handleChange}
            value={mileage}
            autoComplete="current-mileage"
            size="small"
            fullWidth
            required
        />
    )
}
