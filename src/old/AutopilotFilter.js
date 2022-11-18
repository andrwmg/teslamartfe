import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {defaultFilters } from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function AutopilotFilter() {
  const {autopilot, setAutopilot} = useContext(FilterContext);

  const handleChange = (event) => {
    setAutopilot(event.target.value);
  };
  
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Autopilot</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={autopilot}
        label="Autopilot"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Show All</em>
        </MenuItem>
        {defaultFilters.autopilots.map(auto => (
        <MenuItem key={auto} value={auto}>{auto}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
)