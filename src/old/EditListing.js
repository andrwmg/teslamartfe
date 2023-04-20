import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import ListingForm from "../ListingForm";

export default React.memo(function EditListing() {
    const { findData, model,year,trim,interior, renderEditForm, images} = useContext(ListingContext)
    const { id } = useParams()

    useEffect(()=> {
        renderEditForm(id)
    },[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    return (
        <Container>
            <Grid container rowGap={2} direction='row' justifyContent='center'>
                <Grid item xs={12} sm={11}>
                    <Typography variant='h4' color='black'>Edit Listing</Typography>
                </Grid>
                <ListingForm />
            </Grid>
        </Container>
    )
})