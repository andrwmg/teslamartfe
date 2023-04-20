import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "../contexts/ListingContext"

export default function MileageField() {
    const { mileage, setMileage } = useContext(ListingContext)

    const handleChange = (event) => {
        if (event.target.value >= 0 && event.target.value < 1000000) {
        setMileage(event.target.value)
        } else if (event.target.value > 1000000) {
            setMileage(999999)
        }
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
            InputProps={{
                inputProps: {
                min: 0,
                max: 999999,
                type: 'number'
            }}
            }
            fullWidth
            required
        />
    )
}
