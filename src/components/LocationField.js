import React, { useContext, useEffect, useState } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { ListingContext } from "../contexts/ListingContext"

export default function LocationField() {

    const { location, setLocation } = useContext(ListingContext)

    const [options, setOptions] = useState([]);

    useEffect(() => {
        // console.log(window.location.pathname === '/listings/new')
        if (window.location.pathname === '/listings/new') {
            setTimeout(() => {
                setLocation('')
            }, 100)
        }
    }, [])

    const searchOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    }

    const handleInputChange = (event, newValue) => {
        // setLocation(newValue ? newValue : location)
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions({
            input: newValue,
            ...searchOptions
        },
            (predictions, status) => {
                if (status === 'OK') {
                    setOptions(predictions
                        .filter(prediction => prediction.structured_formatting)
                        .map(prediction => {
                            const city = prediction.structured_formatting.main_text;
                            const state = prediction.structured_formatting.secondary_text.split(', ')[0];
                            return { label: `${city}, ${state}` };
                        }))
                    // console.log(location)
                    setLocation(newValue ? newValue : location)
                } else {
                    setOptions([]);
                }
            });
    };

    return (
        <Autocomplete
            value = {location}
            disablePortal
            id="location-search"
            options={options}
            renderInput={(params) => (
                <TextField {...params}
                    label="Location"
                    variant="outlined"
                    // onBlur={handleBlur}
                    fullWidth
                    sx={{ pt: 0 }}
                />
            )}
            onInputChange={handleInputChange}
            clearOnEscape
            blurOnSelect
            autoSelect
            fullWidth
            sx={{
                '& .MuiAutocomplete-inputRoot': { height: '40px' }
                , '& .MuiOutlinedInput-root': { pt: 0 },
                '& label': { top: '-7px' }
            }}
        />
    )
}