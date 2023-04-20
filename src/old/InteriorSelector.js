import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function InteriorSelector(props) {

    const { interior, interiors, setInterior } = useContext(ListingContext)
    const {isForm} = props
    const handleChange = (event) => {
        setInterior(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
            <InputLabel id='interiorSelector'>Interior</InputLabel>
            <Select
                id='interiorSelector'
                onChange={handleChange}
                label='Interior'
                value={interior}
                type="text"
                size="small"
                fullWidth
                required
            >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {interiors.map(interior => (
                    <MenuItem key={interior} value={interior}>{interior}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})