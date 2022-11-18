import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListingContext } from "./contexts/ListingContext";
import ListingForm from "./ListingForm";

export default function EditListing() {
    const { getListing, allListings, findData, model,year,trim,interior, renderEditForm,currentListing} = useContext(ListingContext)
    const { id } = useParams()

    useEffect(()=> {
        renderEditForm(id)
    },[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    return (
        <Container>
            <Grid container rowGap={3} direction='row' justifyContent='center' py={4}>
                <Grid item xs={12} md={11}>
                    <Typography variant='h4' color='black'>Edit Listing</Typography>
                </Grid>
                <ListingForm />
            </Grid>
        </Container>
    )
}