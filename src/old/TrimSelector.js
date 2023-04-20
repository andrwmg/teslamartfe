import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function TrimSelector(props) {

    const { trim, trims, setTrim } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = (event) => {
        setTrim(event.target.value)
    }
    
    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
        <InputLabel id='trimSelector'>Trim</InputLabel>
            <Select
                id='trimSelector'
                onChange={handleChange}
                label='Trim'
                value={trim}
                type="text"
                size="small"
                required
            >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {trims.map(trim => (
                    <MenuItem key={trim} value={trim}>{trim}</MenuItem>
                ))}
            </Select>
            </FormControl>
    )
})