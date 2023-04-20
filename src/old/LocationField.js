import React, { useContext, useEffect, useState } from "react"
import { TextField } from "@mui/material"
import { ListingContext } from "../contexts/ListingContext"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default React.memo(function LocationField() {

    const { location, setLocation } = useContext(ListingContext)
    const [latLng, setLatLng] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState('')
      
    const handleSelect = async address => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        const city = results[0].address_components[0].short_name
        const state = results[0].address_components.filter(comp => comp.types.includes('administrative_area_level_1'))

        setLatLng(latLng)

        setLocation(`${city}, ${state[0].short_name}`)

        setErrorMessage('')
    }
    const searchOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    }

    const handleChange = () => {
        setLatLng(undefined)
    }

    const handleInput = () => {
        if (!latLng) {
            setLocation('')
            setErrorMessage('Start typing your city and make a selection.')
        }
    }

    return (
        <PlacesAutocomplete onSelect={handleSelect} onChange={setLocation} value={location} searchOptions={searchOptions} highlightFirstSelection={true}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                    <TextField
                        id="locationField"
                        label="Location"
                        type="text"
                        onBlur={handleInput}
                        error={errorMessage !== ''}
                        helperText={errorMessage}
                        onChange={handleChange}
                        autoComplete="current-location"
                        size="small"
                        inputProps={{ ...getInputProps({}) }}
                        fullWidth
                        required
                    />
                    {suggestions.length !== 0 ?
                        <div key='dropdown' style={{ position: 'relative', backgroundColor: 'white', width: '100%' }}>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion) => {

                                const style = {
                                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                                }
                                return (<div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>)
                            })
                            }
                        </div>
                        : null}
                </>
            )}
        </PlacesAutocomplete>
    )
})
