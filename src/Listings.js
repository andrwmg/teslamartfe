import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { ListingContext } from './contexts/ListingContext';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';
import LoadingOverlay from './LoadingOverlay';

function Listings() {
    const { resetFilters,filterListings, getAllListings,currentListings, findData, model, year, trim, interior, exterior, autopilot, setIsLoading, sort, setCurrentListings } = useContext(ListingContext)

    const sortListings = () => {
        if (sort === 'Price: Ascending') {
            setCurrentListings(currentListings.sort((a, b) => b.price - a.price))
        } else if (sort === 'Price: Descending') {
            setCurrentListings(currentListings.sort((a, b) => a.price - b.price))
        } else if (sort === 'Mileage: Ascending') {
            setCurrentListings(currentListings.sort((a, b) => b.mileage - a.mileage))
        } else if (sort === 'Mileage: Descending') {
            setCurrentListings(currentListings.sort((a, b) => a.mileage - b.mileage))
        // } else if (sort === 'Date: New...Old') {
        //     return currentListings.sort((a, b) => b.createdAt - a.createdAt)
        // } else if (sort === 'Date: Old...New') {
        //     return currentListings.sort((a, b) => a.createdAt - b.createdAt)
        }
    }

    useEffect(() => {
        getAllListings()
        resetFilters()
        findData()
        setIsLoading(false)
    }, [])

    useEffect(() => {
        sortListings()
    },[sort])

    useEffect(() => {
        findData()
        filterListings()
    }, [model, year, trim, interior, exterior, autopilot])



    return (
        <Container fixed style={{ marginBottom: '20px' }}>
            <Grid container >
            <FilterBar style={{ overflow: 'scroll' }} />
            {currentListings.map(listing => (
                <ListingCard key={listing._id} listing={listing}
                // images={(listing.images) ? listing.images[0].url : "https://res.cloudinary.com/deuft4auk/image/upload/v1661794348/Tesla/0x0-0x0-Service_21_fatbwh.jpg"} 
                />
            ))}
            </Grid>
        </Container>
    );
}

export default Listings;
