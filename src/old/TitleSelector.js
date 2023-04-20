import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";

export default React.memo(function ConditionSelector(props) {

    const { title, titles, setTitle } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
            <InputLabel id='titleSelector'>Title</InputLabel>
            <Select
                id='titleSelector'
                onChange={handleChange}
                label='Title'
                value={title}
                type="text"
                size="small"
                fullWidth
                required
                >
                {!isForm && <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>}
                {titles.map(title => (
                    <MenuItem key={title} value={title}>{title}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})