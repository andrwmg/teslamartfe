import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { defaultFilters } from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function TrimFilter() {

    const { trim, setTrim } = useContext(FilterContext)

    const handleChange = (event) => {
        setTrim(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Trim</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={trim}
                label="Trim"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>
                {defaultFilters.trims.map(trim => (
                    <MenuItem key={trim} value={trim}>{trim}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
)
