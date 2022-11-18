import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "./contexts/ListingContext"

export default function PriceField() {
    const { price, setPrice } = useContext(ListingContext)

    const handleChange = (event) => {
        setPrice(event.target.value)
    }
    return (
        <TextField
            id="priceField"
            label="Price"
            type="number"
            onChange={handleChange}
            value={price}
            autoComplete="current-price"
            size="small"
            fullWidth
            required
        />
    )
}
