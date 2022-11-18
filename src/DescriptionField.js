import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "./contexts/ListingContext"

export default function DescriptionField() {
    const { description, setDescription } = useContext(ListingContext)

    const handleChange = (event) => {
        setDescription(event.target.value)
    }
    return (
        <TextField
            id="descriptionField"
            label="Description"
            type="text"
            onChange={handleChange}
            value={description}
            autoComplete="current-description"
            size="small"
            fullWidth
            multiline
        />
    )
}
