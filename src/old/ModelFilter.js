import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { defaultFilters } from "./ModelSeeds";
import { FilterContext } from "./contexts/FilterContext";

export default React.memo(function ModelFilter() {

const {model, setModel} = useContext(FilterContext)

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <FormControl sx={{minWidth: 120, marginLeft: 0 }} size="small">
      <InputLabel id="demo-select-small">Model</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={model}
        label="Model"
        onChange={handleChange}
      >
        <MenuItem value=''>
          <em>Show All</em>
        </MenuItem>
        {defaultFilters.models.map(model => (
        <MenuItem key={model} value={model}>{model}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
})

