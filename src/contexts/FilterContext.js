import React, { createContext, useEffect, useState } from "react";
import seedListings from "../seedListings";

export const FilterContext = createContext();

const allListings = seedListings

export const FilterProvider = ({children}) =>{
    const [currentListings, setCurrentListings] = useState(allListings)
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [trim, setTrim] = useState('')
    const [interior, setInterior] = useState('')
    const [exterior, setExterior] = useState('')
    const [autopilot, setAutopilot] = useState('')
    const [sort, setSort] = useState('')
    const [order,setOrder] = useState('')

    const allFilters = listing => {
        if (model !== '' && model !== listing.model) return false
        if (year !== '' && year !== listing.year) return false
        if (trim !== '' && trim !== listing.trim) return false
        if (interior !== '' && interior !== listing.interior) return false
        if (exterior !== '' && exterior !== listing.exterior) return false
        if (autopilot !== '' && autopilot !== listing.autopilot) return false
        return true
    }

    const filterListings = () => {
        setCurrentListings(allListings.filter(allFilters))
        }

    const resetFilters =() => {
        setModel('')
        setYear('')
        setTrim('')
        setInterior('')
        setExterior('')
        setAutopilot('')
    }

    const sortListings = () => {
        if (sort === 'Price' && order==='Ascending') {
            return currentListings.sort((a,b) => b.price - a.price)
        } else if (sort === 'Price' && order==='Descending') {
            return currentListings.sort((a,b) => a.price - b.price)
        } else if (sort === 'Mileage' && order==='Ascending') {
            return currentListings.sort((a,b) => b.mileage - a.mileage)
        } else if (sort === 'Mileage' && order==='Descending') {
            return currentListings.sort((a,b) => a.mileage - b.mileage)
        } else {
            return currentListings.sort((a,b) => b.price - a.price)
        }
    }

    useEffect(()=> {
        setCurrentListings(sortListings())
    },[sort,order])

    useEffect(()=> {
        filterListings()
    }, [model,year,trim,interior,exterior,autopilot])

    return (
        <FilterContext.Provider value={{allListings, currentListings, setCurrentListings, model, setModel,year, setYear,trim, setTrim,interior, setInterior,exterior, setExterior,autopilot, setAutopilot, resetFilters, sortListings, sort,setSort,order,setOrder}}>
            {children}
        </FilterContext.Provider>
    )
}