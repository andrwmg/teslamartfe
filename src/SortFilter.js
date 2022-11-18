import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from "./contexts/FilterContext";
import { ListingContext } from "./contexts/ListingContext";

export default React.memo(function SortFilter() {

    const { sort, setSort, order, setOrder } = useContext(ListingContext)

    const handleChange = (event) => {
        // const { sort, order } = event.target.value
        setSort(event.target.value)
        // setOrder(order)
    };

    const sortFilters = [
        'Price: Ascending', 
        'Price: Descending', 
        'Mileage: Ascending', 
        'Mileage: Descending',
        // 'Date Added: New...Old', 
        // 'Date Added: Old...New'
    ]

    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Sort</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue=''
                value={sort}
                label="Sort"
                onChange={handleChange}
                width='100%'
            >
                {/* <MenuItem value={{sort:'Price', order:'Ascending'}}>
                    <em>Price: Ascending</em>
                </MenuItem> */}



                {sortFilters.map(filter => (
                    <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
)