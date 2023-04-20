import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";


export default React.memo(function AutopilotSelector(props) {

    const { autopilot, autopilots, setAutopilot } = useContext(ListingContext)
    const {isForm} = props

    const handleChange = async (event) => {
        await setAutopilot(event.target.value)
    }

    return (
        <FormControl required={isForm} sx={{ minWidth: '120px', width: isForm && '100%'}} size="small">
        <InputLabel id='autopilotSelector'>Autopilot</InputLabel>
            <Select
            name="autopilotSelector"
                id='autopilotSelector'
                onChange={handleChange}
                label='Autopilot'
                value={autopilot}
                type="text"
                size="small"
                required
            >
                {!isForm && 
                <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>
                }
                {autopilots.map(auto => (
                    <MenuItem key={auto} value={auto}>{auto}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})