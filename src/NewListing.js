import { Alert, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { ListingContext } from "./contexts/ListingContext";
import ListingForm from "./ListingForm";

export default function EditListing() {
    const { resetFilters, findData, model,year,trim,interior,setIsLoading} = useContext(ListingContext)

    useEffect(() => {
        resetFilters()
        setIsLoading(false)
        console.log('done')
    },[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    return (
        <Container>
            <Grid container rowGap={3} direction='row' justifyContent='center' py={4}>
                <Grid item xs={12} md={11}>
                    <Typography variant='h4' color='black'>Create Listing</Typography>
                </Grid>
                <ListingForm />
            </Grid>
        </Container>
    )
}