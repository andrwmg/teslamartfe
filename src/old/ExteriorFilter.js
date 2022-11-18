import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {defaultFilters} from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function ExteriorFilter() {
  const {exterior, setExterior} = useContext(FilterContext);

  const handleChange = (event) => {
    setExterior(event.target.value);
  };
  
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Exterior</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={exterior}
        label="Exterior"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Show All</em>
        </MenuItem>
        {defaultFilters.exteriors.map(exterior => (
        <MenuItem key={exterior} value={exterior}>{exterior}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
)