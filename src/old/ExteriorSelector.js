import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function ExteriorSelector(props) {

    const { exterior, exteriors, setExterior } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = (event) => {
        setExterior(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
            <InputLabel id='exteriorSelector'>Exterior</InputLabel>
            <Select
                id='exteriorSelector'
                onChange={handleChange}
                label='Exterior'
                value={exterior}
                type="text"
                size="small"
                required
            >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {exteriors.map(auto => (
                    <MenuItem key={auto} value={auto}>{auto}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})