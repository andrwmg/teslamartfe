import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutopilotSelector from "./AutopilotSelector";
import ConditionSelector from "./ConditionSelector";
import { ListingContext } from "../contexts/ListingContext";
import DescriptionField from "../DescriptionField";
import ExteriorSelector from "./ExteriorSelector";
import ImageUpload from "../ImageUpload";
import InteriorSelector from "./InteriorSelector";
import LocationField from "../LocationField";
import MileageField from "./MileageField";
import ModelSelector from "./ModelSelector";
import PriceField from "../PriceField";
import TitleSelector from "./TitleSelector";
import TrimSelector from "./TrimSelector";
import YearSelector from "./YearSelector";

export default function NewListingForm() {

    const { createNewListing } = useContext(ListingContext)
    const { findData, model,year,trim,interior, renderEditForm} = useContext(ListingContext)
    const { id } = useParams()

    useEffect(()=> {
        if (id) {
            try {
                renderEditForm(id)
            } catch (e) {
                alert('This listing does not exist.')
            }
    }},[])

    useEffect(() => {
        findData()
    }, [model, year, trim, interior])

    const handleSubmit = () => {
        createNewListing()
    }

    const navigate = useNavigate()
    
    const isForm = true

    return (
        <Container>
            <Grid container rowGap={3} direction='row' justifyContent='center'>
                <Grid item xs={12} md={11}>
                    <Typography variant='h4' color='black'>{id}</Typography>
                </Grid>
                <Grid container item xs={12} md={6} direction='row' justifyContent='center'>
                    <Grid item container xs={12} md={10} rowGap={3}>
                        <Typography variant='h5' color='primary'>Model Spec</Typography>
                        <ModelSelector isForm={isForm}/>
                        <YearSelector isForm={isForm}/>
                        <TrimSelector isForm={isForm}/>
                        <Typography variant='h5' color='primary'>
                            Features and Appearance
                        </Typography>
                        <ExteriorSelector isForm={isForm}/>
                        <InteriorSelector isForm={isForm}/>
                        <AutopilotSelector isForm={isForm}/>
                        <Grid item xs={12}>
                            <Typography variant='h5' color='primary'>
                                Upload Images
                            </Typography>
                        </Grid>
                        <ImageUpload />
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6} direction='row' alignItems='flex-start' justifyContent='center'>
                    <Grid item container xs={12} md={10} rowGap={3}>
                            <Typography variant='h5' color='primary'>Condition and Details</Typography>
                            <MileageField isForm={isForm}/>
                            <ConditionSelector isForm={isForm}/>
                            <TitleSelector isForm={isForm}/>
                            <Typography variant='h5' color='primary'>
                            Location
                        </Typography>
                        <LocationField />
                        <Typography variant='h5' color='primary'>
                            Price
                        </Typography>
                        <PriceField />
                        <Typography variant='h5' color='primary'>
                            Description
                        </Typography>
                        <DescriptionField />
                    
                    </Grid>
                </Grid>
                <Grid container item xs={12} justifyContent={{xs:'space-between', md:'space-around'}} direction='row' 
                columnSpacing={{xs: 2, md: 0 }} 
                >
                    <Grid item xs={6} md={5}>
                            <Button onClick={() => navigate(-1)}fullWidth variant="outlined" color='primary'>Back</Button>
                    </Grid>
                    <Grid item xs={6} md={5}>
                            <Button onClick={handleSubmit} fullWidth variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={6}>
                </Grid>
            </Grid>

        </Container>
    )
}