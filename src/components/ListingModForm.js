import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import { ListingForm } from "./index";

export default React.memo(function ListingModForm() {
    const { findData, resetFilters, model,year,trim,interior, renderEditForm} = useContext(ListingContext)
    const { id } = useParams()

    useEffect(()=> {
        id ? 
        renderEditForm(id)
        :
        resetFilters()
    },[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    return (
        <Container>
            <Grid container rowGap={4} direction='row' justifyContent='center'>
                <Grid item xs={12} sm={11}>
                    <Typography variant='h3' color='text.primary'>{id ? 'Edit Listing' : 'New Listing'}</Typography>
                </Grid>
                <ListingForm />
            </Grid>
        </Container>
    )
})