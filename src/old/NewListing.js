import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { ListingContext } from "../contexts/ListingContext";
import ListingForm from "../ListingForm";

export default function NewListing() {
    const { resetFilters, findData, model,year,trim,interior, setLoading} = useContext(ListingContext)

    useEffect(() => {
        resetFilters()
        setLoading(false)
    },[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    return (
        <Container>
            <Grid container rowGap={3} direction='row' justifyContent='center'>
                <Grid item xs={12} sm={11}>
                    <Typography variant='h4' color='black'>Create Listing</Typography>
                </Grid>
                <ListingForm />
            </Grid>
        </Container>
    )
}