import { TextField } from "@mui/material"
import React from "react"

export default function ListingFormField(props) {
    const { label, value, setValue } = props

    const handleChange = (event) => {
        if (event.target.value >= 0 && event.target.value < 1000000) {
        setValue(event.target.value)
        } else if (event.target.value > 1000000) {
            setValue(999999)
        }
    }
    return (
        <TextField
            id={`${label} + 'field'`}
            label={label}
            type="number"
            onChange={handleChange}
            value={value}
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
