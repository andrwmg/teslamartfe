import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "./contexts/ListingContext";

export default function ConditionSelector(props) {

    const { condition, conditions, setCondition } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = (event) => {
        setCondition(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
            <InputLabel id='conditionSelector'>Condition</InputLabel>
            <Select
                id='conditionSelector'
                onChange={handleChange}
                label='Condition'
                value={condition}
                type="text"
                size="small"
                fullWidth
                required
            >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {conditions.map(condition => (
                    <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}