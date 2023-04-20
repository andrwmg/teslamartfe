import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function SortFilter() {

    const { setSort, setOrder } = useContext(ListingContext)

    const handleChange = (event) => {
        const value = event.target.value
        if (value.includes('Oldest First') || value.includes('Ascending')) {
            setOrder(1)
        }
        if (value.includes('Newest First') || value.includes('Descending')) {
            setOrder(-1)
        }
        if (value.includes('Mileage')){
            setSort('mileage')
        }
        if (value.includes('Price')){
            setSort('price')
        }
        if (value.includes('Date')){
            setSort('createdAt')
        }
    };

    const sortFilters = [
        'Price: Ascending', 
        'Price: Descending', 
        'Mileage: Ascending', 
        'Mileage: Descending',
        'Date: Newest First', 
        'Date: Oldest First'
    ]

    return (
        <FormControl sx={{ width: '100%' }} size="small">
            <InputLabel id="demo-select-small">Sort By</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue='Date: Newest First'
                label="Sort By"
                onChange={handleChange}
                width='100%'
            >
                {sortFilters.map(filter => (
                    <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
)