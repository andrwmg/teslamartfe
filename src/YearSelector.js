import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "./contexts/ListingContext";

export default React.memo(function YearSelector(props) {

    const { year, years, setYear } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = (event) => {
        setYear(event.target.value)
    }
    let firstItem
    if (!isForm) {
        firstItem = <MenuItem value="">
        <em>Show All</em>
    </MenuItem>
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
            <InputLabel id='yearSelector'>Year</InputLabel>
            <Select
                id='yearSelector'
                onChange={handleChange}
                label='Year'
                value={year}
                type="text"
                size="small"
                fullWidth
                required
            >
                {firstItem}
                {years.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
            </Select>        
            </FormControl>
    )
})