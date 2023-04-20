import { TextField } from "@mui/material"
import React, { useContext } from "react"
import { ListingContext } from "../contexts/ListingContext"

export default function PriceField() {
    const { price, setPrice } = useContext(ListingContext)

    const handleChange = (event) => {
        if (event.target.value >= 0 && event.target.value < 1000000) {
        setPrice(event.target.value)
        } else if (event.target.value > 1000000) {
            setPrice(999999)
        }
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
            inputProps={{
                min: 0,
                type: 'number'
            }}

            fullWidth
            required
        />
    )
}
