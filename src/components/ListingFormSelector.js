import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";


export default React.memo(function ListingFormSelector(props) {

    const {isForm, value, setValue, data, label } = props

    const handleChange = async (event) => {
        await setValue(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: '100%'}} size="small">
        <InputLabel id={`${label} + 'selector'`}>{label}</InputLabel>
            <Select
            name= {`${label} + 'selector'`}
                id= {`${label} + 'selector'`}
                onChange={handleChange}
                label={label}
                value={value}
                type="text"
                size="small"
                required={isForm}
            >
                {!isForm && 
                <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>
                }
                {data.map(auto => (
                    <MenuItem key={auto} value={auto}>{auto}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})