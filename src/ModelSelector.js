import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "./contexts/ListingContext";

export default React.memo(function ModelSelector(props) {

    const { model, models, setModel } = useContext(ListingContext)
    const { isForm } = props

    const handleChange = (event) => {
        setModel(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%' }} size="small">
            <InputLabel id='modelSelector'>Model</InputLabel>
            <Select
                id='modelSelector'
                onChange={handleChange}
                label='Model'
                value={model}
                type="text"
                size="small"
                fullWidth
                required
            >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {models.map(model => (
                    <MenuItem key={model} value={model}>{model}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})