import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { defaultFilters } from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function YearFilter() {

    const { year, setYear } = useContext(FilterContext)


    const handleChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Year</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={year}
                label="Year"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>
                {defaultFilters.years.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
)