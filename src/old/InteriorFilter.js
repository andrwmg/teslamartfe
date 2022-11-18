import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {defaultFilters} from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function InteriorFilter() {
  const {interior, setInterior} = useContext(FilterContext);

  const handleChange = (event) => {
    setInterior(event.target.value);
  };
  
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Interior</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={interior}
        label="Interior"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Show All</em>
        </MenuItem>
        {defaultFilters.interiors.map(interior => (
        <MenuItem key={interior} value={interior}>{interior}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
)